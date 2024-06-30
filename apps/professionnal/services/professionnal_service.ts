import ProfessionalException from '#apps/professionnal/exceptions/professionnal_exception'
import Professionnal from '#apps/shared/models/professionnal'
import { CreateProfessionnalSchema } from '#apps/professionnal/validators/professionnal'

export default class ProfessionnalService {
  async findByOidcId(oidcId: string) {
    try {
      return Professionnal.query().where('oidc_id', oidcId).firstOrFail()
    } catch (err) {
      throw new ProfessionalException('Professional not found', {
        code: 'E_PROFESSIONNAL_NOT_FOUND',
        status: 404,
      })
    }
  }

  async create(payload: CreateProfessionnalSchema) {
    return Professionnal.create(payload)
  }
}
