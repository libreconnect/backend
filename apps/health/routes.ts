import router from '@adonisjs/core/services/router'
import env from '#start/env'

const HealthController = () => import('#apps/health/controllers/health_controller')
router
  .group(() => {
    router.get('/readiness', [HealthController, 'readiness'])
    router.get('/live', [HealthController, 'live'])
  })
  .use(({ request, response }, next) => {
    if (request.header('x-monitoring-secret') === env.get('APP_KEY')) {
      return next()
    }
    response.unauthorized({
      message: 'Unauthorized access',
      status: 401,
      code: 'E_AUTHENTICATION_UNAUTHORIZED',
    })
  })
  .prefix('/health')
