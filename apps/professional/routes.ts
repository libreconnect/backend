import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ProfessionalController = () =>
  import('#apps/professional/controllers/professionals_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [ProfessionalController, 'index'])
        router.get('/status', [ProfessionalController, 'status'])
        router.post('/', [ProfessionalController, 'store'])
      })
      .prefix('/professionals')
      .middleware(middleware.auth())
  })
  .prefix('/v1')
