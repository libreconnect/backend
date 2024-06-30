import ProfessionalException from '#apps/professionnal/exceptions/professionnal_exception'
import Professional from '#apps/shared/models/professional'

export default class ProfessionnalService {
  async findByOidcId(oidcId: string) {
    try {
      return Professional.query().where('oidc_id', oidcId).firstOrFail()
    } catch (err) {
      throw new ProfessionalException('Professional not found', {
        code: 'E_PROFESSIONNAL_NOT_FOUND',
        status: 404,
      })
    }
  }
}
