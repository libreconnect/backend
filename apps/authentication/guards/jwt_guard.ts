import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'
import { symbols, errors } from '@adonisjs/auth'
import { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import KeycloakService from '#apps/authentication/services/keycloak_service'
import * as authErrors from '#apps/authentication/errors'
import env from '#start/env'

export type JwtGuardUser<RealUser> = {
  /**
   * Returns the unique ID of the user
   */
  getId(): string | number | BigInt

  /**
   * Returns the original user object
   */
  getOriginal(): RealUser
}

export interface JwtUserProviderContract<RealUser> {
  [symbols.PROVIDER_REAL_USER]: RealUser

  createUserForGuard(user: RealUser): Promise<JwtGuardUser<RealUser>>
  findById(identifier: string | number | BigInt): Promise<JwtGuardUser<RealUser> | null>
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

    if (env.get('NODE_ENV') === 'test') {
      const payload = jwt.decode(token)
      if (!payload) {
        throw this.#authenticationFailed()
      }
      this.user = payload as UserProvider[typeof symbols.PROVIDER_REAL_USER]
      return
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

  async generate(user: UserProvider[typeof symbols.PROVIDER_REAL_USER]) {
    return {
      scope: 'profile email',
      sub: (user as any).oidcId,
      name: 'Nathael',
      preferred_username: 'nathael',
      given_name: 'Nathael',
      family_name: 'Sante',
    }
  }

  async authenticateAsClient(
    user: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  ): Promise<AuthClientResponse> {
    const payload = await this.generate(user)

    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' })

    this.user = payload
    return {
      headers: {
        Authorization: `Bearer ${token}`,
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
