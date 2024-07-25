import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class HeartException extends Exception {
  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      message: error.message,
      status: error.status,
      code: error.code,
    })
  }
}
