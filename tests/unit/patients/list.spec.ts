import PatientService from '#apps/patient/services/patient_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Patients list', () => {
  test('example test', async ({ assert }) => {
    const patientService = await app.container.make(PatientService)

    const t = await patientService.findAll({ limit: 11 })

    assert.equal(t.perPage, 11)
  })
})
