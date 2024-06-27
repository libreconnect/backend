import PatientService from '#apps/patient/services/patient_service'
import { inject } from '@adonisjs/core'
import { AuthenticationException } from '../exceptions/authentication.js'

@inject()
export default class AuthenticationService {
  constructor(protected patientService: PatientService) {}
  async findUserByOidcId(oidcId: string) {
    const patient = await this.patientService.findByOidcId(oidcId)

    if (!patient) {
      throw new AuthenticationException('Profile not created', {
        status: 403,
        code: 'E_PROFILE_NOT_CREATED',
      })
    }

    return patient
  }
}
