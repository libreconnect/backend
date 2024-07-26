import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors } from '@adonisjs/core'
import { errors as authErrors } from '@adonisjs/auth'
import { errors as lucidErrors } from '@adonisjs/lucid'
import * as patientErrors from '#apps/patient/errors'
import * as authenticationErrors from '#apps/authentication/errors'
import { errors as bouncerErrors } from '@adonisjs/bouncer'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof bouncerErrors.E_AUTHORIZATION_FAILURE) {
      return ctx.response.status(error.status).send({
        message: error.message,
        status: error.status,
        code: error.response.message,
      })
    }
    if (error instanceof errors.E_ROUTE_NOT_FOUND) {
      ctx.response.status(404).send({
        message: error.message,
        status: error.status,
      })
      return
    }
    if (error instanceof authErrors.E_UNAUTHORIZED_ACCESS) {
      ctx.response.status(401).send({
        message: error.message,
        status: error.status,
      })
      return
    }
    if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
      ctx.response.status(404).send({
        message: error.message,
        status: error.status,
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

    if (error instanceof authenticationErrors.E_AUTHENTICATION_UNAUTHORIZED) {
      ctx.response.status(401).send({
        message: error.message,
        status: error.status,
        code: error.code,
      })
      return
    }

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

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
