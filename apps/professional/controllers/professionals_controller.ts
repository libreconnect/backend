import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProfessionalService from '#apps/professional/services/professional_service'
import Professional from '#models/professional'
import { createProfessionalValidator } from '#apps/professional/validators/professional'

@inject()
export default class ProfessionalsController {
  constructor(private professionalService: ProfessionalService) {}

  async index({}: HttpContext) {
    return Professional.query().preload('company')
  }

  async show({ params }: HttpContext) {
    return this.professionalService.findByOidcId(params.id)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createProfessionalValidator)

    return this.professionalService.create(data)
  }
}
