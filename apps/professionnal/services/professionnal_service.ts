import ProfessionalException from '#apps/professionnal/exceptions/professionnal_exception'
import Professionnal from '#apps/shared/models/professionnal'
import { CreateProfessionnalSchema } from '#apps/professionnal/validators/professionnal'

export default class ProfessionnalService {
  async findByOidcId(oidcId: string) {
    const professionnal = await Professionnal.query().where('oidc_id', oidcId).firstOrFail()

    if (!professionnal) {
      throw new ProfessionalException('Professional not found', {
        code: 'E_PROFESSIONNAL_NOT_FOUND',
        status: 404,
      })
    }
    return professionnal
  }

  async create(payload: CreateProfessionnalSchema) {
    return Professionnal.create(payload)
  }
}
