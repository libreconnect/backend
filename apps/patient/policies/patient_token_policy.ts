import { JWTPayload } from '#apps/authentication/contracts/jwt'
import Patient from '#apps/shared/models/patient'
import { BasePolicy } from '@adonisjs/bouncer'

export default class PatientTokenPolicy extends BasePolicy {
  async create(payload: JWTPayload, patient: Patient) {
    return payload.sub === patient.oidcId
  }
}
