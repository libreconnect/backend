import Patient from '#apps/shared/models/patient'
import { test } from '@japa/runner'
import Professionnal from '#models/professionnal'

test.group('Patients list', () => {
  test('should return a 403 error when a patient user accesses /v1/patients', async ({
    assert,
    client,
  }) => {
    const patient = await Patient.firstOrFail()


    const response = await client
      .get('/v1/patients')
      .loginAs(patient)

    response.assertStatus(403)

    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_PATIENT_FETCH_UNAUTHORIZED')
  }).tags(['patients'])

  test('should return a list of patients with meta and data properties for a professional user', async ({
    client,
    assert,
  }) => {
    const professional = await Professionnal.firstOrFail()

    const response = await client
      .get('/v1/patients')
      .loginAs(professional)
    response.assertStatus(200)
    assert.properties(response.body(), ['data', 'meta'])
  }).tags(['patients'])

  test('should return a 401 error if the user is not logged in', async ({ client, assert }) => {
    const response = await client.get('/v1/patients')

    response.assertStatus(401)

    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  }).tags(['patients'])
})
