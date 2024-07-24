import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AuthenticationService from '#apps/authentication/services/authentication_service'
import { JWTPayload } from '../contracts/jwt.js'

@inject()
export default class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  async me({ auth }: HttpContext) {
    const user: JWTPayload = auth.user

    return this.authenticationService.findUserByOidcId(user.sub)
  }
}
