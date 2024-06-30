import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'
import { symbols, errors } from '@adonisjs/auth'
import { HttpContext } from '@adonisjs/core/http'
export type JwtGuardUser<RealUser> = {
  getId(): string
  getOriginal(): RealUser
}
import jwt from 'jsonwebtoken'
import logger from '@adonisjs/core/services/logger'
import KeycloakService from '../services/keycloak_service.js'

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

  async authenticate() {
    const authHeader = this.#ctx.request.header('Authorization')
    if (!authHeader) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }
    const key = await this.#keycloakService.getPublicCert()
    const publicKey = `-----BEGIN CERTIFICATE-----\n${key}\n-----END CERTIFICATE-----`
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    if (typeof payload !== 'object' || !('sub' in payload)) {
      console.log('error payload')

      logger.error('Invalid token payload', payload)
      throw new errors.E_UNAUTHORIZED_ACCESS('Invalid token', {
        guardDriverName: this.driverName,
      })
    }

    // const providerUser = await this.#userProvider.findById(payload.sub!)
    // if (!providerUser) {
    //   throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
    //     guardDriverName: this.driverName,
    //   })
    // }

    this.user = payload
  }

  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch (e) {
      logger.error(e)
      return false
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
