import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import { inject } from '@adonisjs/core'
import RoleService from '#apps/shared/services/role_service'
import CompanyException from '#apps/companies/exceptions/company_exception'
import { Roles } from '#apps/shared/interfaces/roles'

@inject()
export default class CompanyPolicy extends BasePolicy {
  constructor(private roleService: RoleService) {
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

  async store(payload: JWTPayload) {
    if (this.roleService.verifyAccess(payload, Roles.COMPANY_CREATOR)) {
      return AuthorizationResponse.allow()
    }
    return AuthorizationResponse.deny('You are not authorised to create a company', 403)
  }
}
