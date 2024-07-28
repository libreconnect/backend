export type JWTPayload = {
  'exp': number
  'iat': number
  'jti': string
  'iss': string
  'aud': string
  'sub': string
  'typ': string
  'azp': string
  'session_state': string
  'acr': string
  'allowed-origins': string[]
  'realm_access': {
    roles: string[]
  }
  'resource_access': { [key: string]: { roles: string[] } }
  'scope': string
  'sid': string
  'email_verified': boolean
  'name': string
  'preferred_username': string
  'given_name': string
  'family_name': string
  'email': string
  [key: string]: any
}

declare module '@japa/api-client' {
  interface ApiRequest {
    loginAs(user: any, realmRoles: string[]): this
  }
}
