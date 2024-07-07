import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import PatientService from '#apps/patient/services/patient_service'
import Patient from '#apps/shared/models/patient'

@inject()
export default class PatientTokensController {
  constructor(protected patientService: PatientService) {}

  async store({ params, auth }: HttpContext) {
    const patient = await this.patientService.findById(params.patientId)
    const authenticatedUser = auth.user

    const token = await Patient.accessTokens.create(patient)

    return {
      patient,
      user: authenticatedUser,
      token,
    }
  }
}
