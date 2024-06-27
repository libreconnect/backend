import { KeycloakConfig } from '#apps/authentication/services/keycloak_service'

const keycloakConfig: KeycloakConfig = {
  realm: 'libreconnect',
  url: 'http://localhost:8080',
  admin: {},
}

export default keycloakConfig
