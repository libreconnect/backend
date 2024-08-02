import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import { inject } from '@adonisjs/core'
import RoleService from '#apps/shared/services/role_service'
import CompanyException from '#apps/companies/exceptions/company_exception'
import { Roles } from '#apps/shared/interfaces/roles'
import ProfessionalService from '#apps/professional/services/professional_service'

@inject()
export default class CompanyPolicy extends BasePolicy {
  constructor(
    private roleService: RoleService,
    private professionalService: ProfessionalService
  ) {
    super()
  }

  async after(_payload: JWTPayload, _action: string, response: AuthorizationResponse) {
    if (!response.authorized) {
      throw new CompanyException(response.message, {
        status: response.status,
        code: 'E_COMPANY_UNAUTHORIZED',
      })
    }
  }

  async view(payload: JWTPayload) {
    if (this.roleService.verifyAccess(payload, Roles.COMPANY_VIEWER)) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not authorized to view companies', 403)
  }

  async show(payload: JWTPayload, companyId: string) {
    try {
      const professional = await this.professionalService.findByOidcId(payload.sub)
      if (!professional || professional.companyId !== companyId) {
        return AuthorizationResponse.deny('You are not authorized to view this company', 403)
      }

      return AuthorizationResponse.allow()
    } catch (error) {
      return AuthorizationResponse.deny('You are not authorized to view this company', 403)
    }
  }

  async store(payload: JWTPayload) {
    if (this.roleService.verifyAccess(payload, Roles.COMPANY_CREATOR)) {
      return AuthorizationResponse.allow()
    }
    return AuthorizationResponse.deny('You are not authorised to create a company', 403)
  }
}
