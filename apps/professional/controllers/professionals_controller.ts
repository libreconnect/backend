import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProfessionalService from '#apps/professional/services/professional_service'
import Professional from '#models/professional'
import {
  createProfessionalValidator,
  getProfessionalStatusValidator,
} from '#apps/professional/validators/professional'
import ProfessionalPolicy from '#apps/professional/policies/professional_policy'

@inject()
export default class ProfessionalsController {
  constructor(private professionalService: ProfessionalService) {}

  async index({}: HttpContext) {
    return Professional.query().preload('company')
  }

  async show({ params }: HttpContext) {
    return this.professionalService.findByOidcId(params.id)
  }

  async status({ request, bouncer }: HttpContext) {
    const dto = await request.validateUsing(getProfessionalStatusValidator)
    await bouncer.with(ProfessionalPolicy).authorize('show' as never, dto.sub)

    return this.professionalService.findByOidcId(dto.sub)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createProfessionalValidator)

    return this.professionalService.create(data)
  }
}
