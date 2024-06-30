import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PatientController = () => import('#apps/patient/controllers/patients_controller')
const PatientGlycemiaController = () =>
  import('#apps/patient/controllers/patient_glucose_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [PatientController, 'store'])
        router.get('/:id', [PatientController, 'show'])

        router
          .group(() => {
            router.get('/glycemia', [PatientGlycemiaController, 'show'])
          })
          .prefix('/:patientId')
      })
      .prefix('patients')
      .middleware(middleware.auth())
  })
  .prefix('/v1')
