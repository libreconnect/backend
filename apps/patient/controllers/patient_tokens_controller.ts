import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import PatientService from '#apps/patient/services/patient_service'
import Patient from '#apps/shared/models/patient'
import PatientTokenPolicy from '#apps/patient/policies/patient_token_policy'

@inject()
export default class PatientTokensController {
  constructor(private patientService: PatientService) {}

  /**
   * @store
   * @summary Create patient token
   * @responseBody 201 - { "patient": "<Patient>", "token": "<AccessToken>" }
   * @responseBody 403 - Forbidden
   * @responseBody 401 - Unauthorized
   */
  async store({ params, bouncer }: HttpContext) {
    const patient = await this.patientService.findById(params.patientId)
    await bouncer.with(PatientTokenPolicy).authorize('create', patient)

    const token = await Patient.accessTokens.create(patient)

    return {
      patient,
      token,
    }
  }
}
