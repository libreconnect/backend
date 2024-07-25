import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ProfessionnalController = () =>
  import('#apps/professionnal/controllers/professionnals_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [ProfessionnalController, 'index'])
        router.post('/', [ProfessionnalController, 'store'])
      })
      .prefix('/professionnals')
      .middleware(middleware.auth())
  })
  .prefix('/v1')
