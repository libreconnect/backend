import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CompanyService from '#apps/companies/services/company_service'

@inject()
export default class CompaniesController {
  constructor(private companyService: CompanyService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}
}
