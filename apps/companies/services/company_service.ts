import { Exception } from '@adonisjs/core/exceptions'
import Company from '#apps/shared/models/company'
import { CreateCompaniesSchema, GetCompaniesSchema } from '#apps/companies/validators/company'
import logger from '@adonisjs/core/services/logger'

export default class CompanyService {
  async findAll({ page = 1, limit = 10, nationalCode }: GetCompaniesSchema) {
    return Company.query()
      .if(nationalCode, (query) => {
        query.where('nationalCode', nationalCode!)
      })
      .paginate(page, limit)
  }

  async findById(id: string) {
    return Company.query().where('id', id).first()
  }

  async create(payload: CreateCompaniesSchema): Promise<Company> {
    try {
      const company = await Company.create(payload)
      logger.info(company.$attributes, 'Company created')

      return company
    } catch (err) {
      throw new Exception('Failed to create company', {
        code: 'E_COMPANY_CREATE',
        status: 500,
      })
    }
  }
}
