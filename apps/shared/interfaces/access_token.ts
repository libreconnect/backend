export interface AccessToken {
  type: string
  name: string | null
  token: string
  abilities: string[]
  lastUsedAt: Date
  expiresAt: Date
}
