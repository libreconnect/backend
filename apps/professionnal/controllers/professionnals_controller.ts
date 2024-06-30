import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProfessionnalService from '#apps/professionnal/services/professionnal_service'
import Professionnal from '#apps/shared/models/professionnal'

@inject()
export default class ProfessionnalsController {
  constructor(private professionnalService: ProfessionnalService) {}

  async index({}: HttpContext) {
    return Professionnal.query().preload('company')
  }

  async show({ params }: HttpContext) {
    return this.professionnalService.findByOidcId(params.id)
  }
}
