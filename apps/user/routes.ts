import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UserController = () => import('#apps/user/controllers/users_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/status', [UserController, 'status'])
      })
      .prefix('/users')
      .middleware(middleware.auth())
  })
  .prefix('/v1')
