import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ProfessionalException extends Exception {
  async handle(error: this, { response }: HttpContext) {
    response.status(error.status).send({
      message: error.message,
    })
  }
}
