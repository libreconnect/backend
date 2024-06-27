import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export class AuthenticationException extends Exception {
  async handle(error: this, ctx: HttpContext) {
    if (error.code === 'E_PROFILE_NOT_CREATED') {
      ctx.response.status(error.status).send({
        message: error.message,
        code: error.code,
      })
      return
    }

    ctx.response.status(error.status).send({
      message: error.message,
    })
  }
}
