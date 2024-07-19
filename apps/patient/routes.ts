import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PatientController = () => import('#apps/patient/controllers/patients_controller')
const PatientGlycemiaController = () =>
  import('#apps/patient/controllers/patient_glucose_controller')
const PatientTokensController = () => import('#apps/patient/controllers/patient_tokens_controller')

const PatientActivitiesController = () =>
  import('#apps/patient/controllers/patient_activities_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [PatientController, 'index'])
        router.post('/', [PatientController, 'store'])
        router.get('/:id', [PatientController, 'show'])

        router
          .group(() => {
            router.get('/glycemia', [PatientGlycemiaController, 'show'])

            router.post('/tokens', [PatientTokensController, 'store'])

            router.get('/activities', [PatientActivitiesController, 'index'])
          })
          .prefix('/:patientId')
      })
      .prefix('patients')
      .middleware(middleware.auth())
  })
  .prefix('/v1')
