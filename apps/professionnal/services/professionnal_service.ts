import ProfessionalException from '#apps/professionnal/exceptions/professionnal_exception'
import Professionnal from '#apps/shared/models/professionnal'
import { CreateProfessionnalSchema } from '#apps/professionnal/validators/professionnal'
import logger from '@adonisjs/core/services/logger'

export default class ProfessionnalService {
  async findByOidcId(oidcId: string) {
    try {
      logger.info('Fetching professionnal with oidc id %s', oidcId)
      const professionnal = await Professionnal.query().where('oidc_id', oidcId).first()

      if (!professionnal) {
        throw new ProfessionalException('Professional not found', {
          code: 'E_PROFESSIONNAL_NOT_FOUND',
          status: 404,
        })
      }
      return professionnal
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
