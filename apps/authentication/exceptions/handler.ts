import { ExceptionHandler, HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import * as authErrors from '#apps/authentication/errors'
export default class HttpAuthenticationExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof authErrors.E_AUTHENTICATION_UNAUTHORIZED) {
      ctx.response.status(401).send({
        message: error.message,
        status: error.status,
        code: error.code,
      })
      return
    }
    return super.handle(error, ctx)
  }
}
