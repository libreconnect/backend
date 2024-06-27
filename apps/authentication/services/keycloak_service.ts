import keycloakConfig from '#config/keycloak'

type WellKnownKeyResponse = {
  keys: {
    'kid': string
    'kty': string
    'alg': string
    'use': string
    'n': string
    'e': string
    'x5c': string[]
    'x5t': string
    'x5t#S256': string
  }[]
}

export type KeycloakConfig = {
  realm?: string
  url?: string
  clientId?: string
  clientSecret?: string
  admin: {
    clientId?: string
    clientSecret?: string
  }
}

export default class KeycloakService {
  private publicCert?: string

  async getPublicCert(): Promise<string> {
    return this.publicCert ?? (await this.fetchOidcCert())
  }

  private async fetchOidcCert(): Promise<string> {
    const url = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/certs`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch OIDC certs')
    }

    const data: WellKnownKeyResponse = (await response.json()) as WellKnownKeyResponse
    const rs256key = data.keys.filter((key) => key.alg === 'RS256')

    if (!rs256key) {
      throw new Error('RS256 key not found')
    }

    this.publicCert = rs256key[0].x5c[0]

    return this.publicCert
  }
}
