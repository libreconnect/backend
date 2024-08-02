import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const CompaniesController = () => import('#apps/companies/controllers/companies_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [CompaniesController, 'index'])
        router.get('/:id', [CompaniesController, 'show'])
        router.post('/', [CompaniesController, 'create'])
      })
      .prefix('/companies')
      .middleware(middleware.auth())
  })
  .prefix('/v1')
