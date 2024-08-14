import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import Patient from '#models/patient'
import HeartException from '#apps/heart/exceptions/heart_exception'

export default class PatientHeartRatesPolicy extends BasePolicy {
  async after(_payload: JWTPayload, _action: string, response: AuthorizationResponse) {
    if (!response.authorized) {
      throw new HeartException(response.message, {
        status: response.status,
        code: 'E_PATIENT_HEART_UNAUTHORIZED',
      })
    }
  }

  async view(payload: JWTPayload, patient: Patient) {
    if (patient.oidcId === payload.sub) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny("You can't show the heart data to this patient", 403)
  }

  async create(_payload: JWTPayload, patient: Patient, patientId: string) {
    if (patient.id === patientId) return AuthorizationResponse.allow()

    return AuthorizationResponse.deny("You can't create a heart data for this user", 403)
  }
}
