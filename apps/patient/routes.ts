import router from '@adonisjs/core/services/router'

const PatientController = () => import('#apps/patient/controllers/patients_controller')

router
  .group(() => {
    router.get('/:id', [PatientController, 'show'])
  })
  .prefix('patient')
