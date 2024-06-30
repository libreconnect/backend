import { JwtGuard } from '#apps/authentication/guards/jwt_guard'
import KeycloakService from '#apps/authentication/services/keycloak_service'
import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#apps/user/models/user'),
      }),
    }),
    jwt: (ctx) => {
      return new JwtGuard(ctx, new KeycloakService())
    },
  },
})

export default authConfig
