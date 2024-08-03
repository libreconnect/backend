import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import ProfessionalException from '#apps/professional/exceptions/professional_exception'

export default class ProfessionalPolicy extends BasePolicy {
  async after(_payload: JWTPayload, _action: string, response: AuthorizationResponse) {
    if (!response.authorized) {
      throw new ProfessionalException(response.message, {
        status: response.status,
        code: 'E_PROFESSIONAL_UNAUTHORIZED',
      })
    }
  }

  async show(payload: JWTPayload, sub?: string) {
    if (sub) {
      if (payload.sub === sub) {
        return AuthorizationResponse.allow()
      } else {
        return AuthorizationResponse.deny('You are not authorized to view this professional', 403)
      }
    }

    return AuthorizationResponse.deny('You are not authorized to view this professional', 403)
  }
}
