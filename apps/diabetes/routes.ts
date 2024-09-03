import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const PatientGlucoseController = () =>
  import('#apps/diabetes/controllers/patient_glucose_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/glycemia', [PatientGlucoseController, 'show'])
      })
      .prefix('/patients/:patientId')
      .use(middleware.auth())
  })
  .prefix('/v1')
