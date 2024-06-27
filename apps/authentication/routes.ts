import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthenticationController = () =>
  import('#apps/authentication/controllers/authentication_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/me', [AuthenticationController, 'me']).middleware(middleware.auth())
      })
      .prefix('authentication')
  })
  .prefix('/v1')
