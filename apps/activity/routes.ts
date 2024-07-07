import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const StepsController = () => import('#apps/activity/controllers/steps_controller')

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            router.post('/', [StepsController, 'store'])
          })
          .prefix('/steps')
      })
      .prefix('/activities')
      .middleware(
        middleware.auth({
          guards: ['api', 'jwt'],
        })
      )
  })
  .prefix('/v1')
