import { JwtGuard } from '#apps/authentication/guards/jwt_guard'
import KeycloakService from '#apps/authentication/services/keycloak_service'
import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'

const userProvider = tokensUserProvider({
  tokens: 'accessTokens',
  model: () => import('#apps/shared/models/patient'),
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    api: tokensGuard({
      provider: userProvider,
    }),
    jwt: (ctx) => {
      return new JwtGuard(ctx, new KeycloakService())
    },
  },
})

export default authConfig
