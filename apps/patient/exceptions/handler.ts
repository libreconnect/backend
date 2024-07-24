import { ExceptionHandler, HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import * as patientErrors from '#apps/patient/errors'

export default class HttpPatientExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    console.log('error', error)

    if (error instanceof patientErrors.E_PATIENT_NOT_FOUND) {
      ctx.response.status(404).send({
        message: error.message,
        status: error.status,
        code: error.code,
      })
      return
    }

    if (error instanceof patientErrors.E_PATIENT_FETCH_UNAUTHORIZED) {
      ctx.response.status(403).send({
        message: error.message,
        status: error.status,
        code: error.code,
      })
      return
    }
    return super.handle(error, ctx)
  }
}
