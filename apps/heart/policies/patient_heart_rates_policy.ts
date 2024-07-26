import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import Patient from '#models/patient'

export default class PatientHeartRatesPolicy extends BasePolicy {
  async create(_payload: JWTPayload, patient: Patient, patientId: string) {
    if (patient.id === patientId) return true

    return AuthorizationResponse.deny('E_HEART_CREATION_UNAUTHORIZED', 403)
  }
}
