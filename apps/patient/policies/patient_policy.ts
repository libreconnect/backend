import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import PatientException from '#apps/patient/exceptions/patient_exception'

export default class PatientPolicy extends BasePolicy {
  async after(_payload: JWTPayload, _action: string, response: AuthorizationResponse) {
    if (!response.authorized) {
      throw new PatientException(response.message, {
        status: response.status,
        code: 'E_PATIENT_UNAUTHORIZED',
      })
    }
  }

  async show(payload: JWTPayload, sub?: string) {
    if (sub) {
      if (payload.sub === sub) {
        return AuthorizationResponse.allow()
      } else {
        return AuthorizationResponse.deny('You are not authorized to view this patient', 403)
      }
    }

    return AuthorizationResponse.deny('You are not authorized to view this patient', 403)
  }
}
