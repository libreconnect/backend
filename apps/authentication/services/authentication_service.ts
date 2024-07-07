import PatientService from '#apps/patient/services/patient_service'
import { inject } from '@adonisjs/core'
import { AuthenticationException } from '#apps/authentication/exceptions/authentication'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import Patient from '#apps/shared/models/patient'

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

  getOidcId(guard: string, user: any): string {
    return guard === 'jwt' ? (user as JWTPayload).sub : (user as Patient).oidcId
  }
}
