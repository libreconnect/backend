import { test } from '@japa/runner'
import Patient from '#models/patient'

test.group('Patients show', () => {
  test('should return 200 if the similar patient', async ({ assert, client }) => {
    const patient = await Patient.findByOrFail('oidc_id', 'df6813f5-1585-40da-af91-194c1b89c979')

    const response = await client.get('/v1/patients/9498994932837253124945211').loginAs(patient, [])

    response.assertStatus(200)
    assert.include(response.body(), {
      id: '9498994932837253124945211',
      name: 'Nathael',
    })
  })

  test('should return 403 if the patient is not the same', async ({ assert, client }) => {
    const patient = await Patient.findByOrFail('oidc_id', 'f875c155-9607-4aa3-af4e-59b3bff848ff')

    const response = await client.get('/v1/patients/9498994932837253124945211').loginAs(patient, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_PATIENT_UNAUTHORIZED')
  })

  test('should return 401 if the user is not logged in', async ({ client, assert }) => {
    const response = await client.get('/v1/patients/9498994932837253124945211')

    response.assertStatus(401)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  })
})
