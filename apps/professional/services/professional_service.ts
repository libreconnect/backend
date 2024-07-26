import ProfessionalException from '#apps/professional/exceptions/professional_exception'
import Professional from '#models/professional'
import { CreateProfessionalSchema } from '#apps/professional/validators/professional'

export default class ProfessionalService {
  async findByOidcId(oidcId: string) {
    const professional = await Professional.query().where('oidc_id', oidcId).firstOrFail()

    if (!professional) {
      throw new ProfessionalException('Professional not found', {
        code: 'E_PROFESSIONNAL_NOT_FOUND',
        status: 404,
      })
    }
    return professional
  }

  async create(payload: CreateProfessionalSchema) {
    return Professional.create(payload)
  }
}
