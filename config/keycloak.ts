import { KeycloakConfig } from '#apps/authentication/services/keycloak_service'
import env from '#start/env'

const keycloakConfig: KeycloakConfig = {
  realm: env.get('KEYCLOAK_REALM'),
  url: env.get('KEYCLOAK_URL'),
  admin: {},
  clientId: env.get('KEYCLOAK_CLIENT_ID'),
  clientSecret: env.get('KEYCLOAK_CLIENT_SECRET'),
}

export default keycloakConfig
