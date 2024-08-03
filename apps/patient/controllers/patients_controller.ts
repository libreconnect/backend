import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PatientService from '#apps/patient/services/patient_service'
import { createPatientValidator, patientsQueryValidator } from '#apps/patient/validators/patient'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import PatientPolicy from '#apps/patient/policies/patient_policy'

@inject()
export default class PatientsController {
  constructor(private patientService: PatientService) {}

  /**
   * @index
   * @summary List all patients
   * @responseBody 200 - <Patient[]>.paginated()
   * @responseBody 403 - Forbidden
   * @responseBody 401 - Unauthorized
   * @paramQuery page - Page number - @type(number)
   * @paramQuery limit - Number of items per page - @type(number)
   */
  async index({ request, auth }: HttpContext) {
    const data = await request.validateUsing(patientsQueryValidator)
    const user = auth.user as JWTPayload

    return this.patientService.findAll(data, user.sub)
  }

  /**
   * @show
   * @summary Show a patient
   * @reponseBody 200 - <Patient>
   * @responseBody 403 - Forbidden
   * @responseBody 401 - Unauthorized
   */
  async show({ params, bouncer }: HttpContext) {
    const patient = await this.patientService.findById(params.id)
    await bouncer.with(PatientPolicy).authorize('show' as never, patient.oidcId)
    return patient
  }

  /**
   * @store
   * @summary Create a patient
   * @description Returns array of producs and it's relations
   * @responseBody 201 - <Patient>
   * @responseBody 403 - Forbidden
   * @responseBody 401 - Unauthorized
   * @requestBody <createPatientValidator>
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createPatientValidator)

    return this.patientService.create(data)
  }
}
