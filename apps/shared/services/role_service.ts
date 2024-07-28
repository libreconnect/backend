import { JWTPayload } from '#apps/authentication/contracts/jwt'

export default class RoleService {
  verifyAccess(payload: JWTPayload, role: string) {
    return payload.realm_access.roles.includes(role)
  }
}
