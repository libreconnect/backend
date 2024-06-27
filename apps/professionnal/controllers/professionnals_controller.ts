import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ProfessionnalService from '#apps/professionnal/services/professionnal_service'
@inject()
export default class ProfessionnalsController {
  constructor(private professionnalService: ProfessionnalService) {}
  
}
