import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CompanyService from '#apps/companies/services/company_service'
import { createCompanyValidator, getComaniesValidator } from '../validators/company.js'

@inject()
export default class CompaniesController {
  constructor(private companyService: CompanyService) {}

  /**
   * @index
   * @operationId getProducts
   * @description Returns array of producs and it's relations
   * @responseBody 200 - <Company[]>.with(relations).paginated()
   * @paramUse(sortable, filterable)
   * @responseHeader 200 - @use(paginated)
   * @responseHeader 200 - X-pages - A description of the header - @example(test)
   */
  async index({ request }: HttpContext) {
    const data = await request.validateUsing(getComaniesValidator)

    return this.companyService.findAll(data)
  }

  async create({ request }: HttpContext) {
    const data = await request.validateUsing(createCompanyValidator)

    return this.companyService.create(data)
  }
}
