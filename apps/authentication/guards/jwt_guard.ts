import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'
import { symbols, errors } from '@adonisjs/auth'
import { HttpContext } from '@adonisjs/core/http'
export type JwtGuardUser<RealUser> = {
  getId(): string
  getOriginal(): RealUser
}
import jwt from 'jsonwebtoken'
import KeycloakService from '#apps/authentication/services/keycloak_service'
import * as authErrors from '#apps/authentication/errors'

export interface JwtUserProviderContract<RealUser> {
  [symbols.PROVIDER_REAL_USER]: RealUser
}

export class JwtGuard<UserProvider extends JwtUserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  #ctx: HttpContext
  #keycloakService: KeycloakService

  constructor(ctx: HttpContext, keycloakService: KeycloakService) {
    this.#ctx = ctx
    this.#keycloakService = keycloakService
  }

  declare [symbols.GUARD_KNOWN_EVENTS]: {}
  driverName: 'jwt' = 'jwt'

  authenticationAttempted: boolean = false
  isAuthenticated: boolean = false
  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]

  #authenticationFailed() {
    const error = new authErrors.E_AUTHENTICATION_UNAUTHORIZED()

    return error
  }

  async authenticate() {
    const authHeader = this.#ctx.request.header('Authorization')
    if (!authHeader) {
      throw this.#authenticationFailed()
    }

    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      throw this.#authenticationFailed()
    }
    const key = await this.#keycloakService.getPublicCert()
    const publicKey = `-----BEGIN CERTIFICATE-----\n${key}\n-----END CERTIFICATE-----`

    try {
      const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
      if (typeof payload !== 'object' || !('sub' in payload)) {
        throw this.#authenticationFailed()
      }
      this.user = payload
    } catch (err) {
      throw this.#authenticationFailed()
    }

    // const providerUser = await this.#userProvider.findById(payload.sub!)
    // if (!providerUser) {
    //   throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
    //     guardDriverName: this.driverName,
    //   })
    // }
  }

  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch (error) {
      if (error instanceof errors.E_UNAUTHORIZED_ACCESS) {
        return false
      }

      throw error
    }
  }

  async authenticateAsClient(): Promise<AuthClientResponse> {
    return {
      headers: {
        authorization: ``,
      },
    }
  }

  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
    if (!this.user) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    return this.user
  }
}
