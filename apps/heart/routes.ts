import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const PatientHeartRatesController = () =>
  import('#apps/heart/controllers/patient_heart_rates_controller')

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            router.post('/', [PatientHeartRatesController, 'store'])
            router.get('/', [PatientHeartRatesController, 'show'])
          })
          .prefix('rates')
      })
      .prefix('heart')
      .middleware(middleware.auth())
  })
  .prefix('v1')
