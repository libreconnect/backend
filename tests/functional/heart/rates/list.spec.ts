import { test } from '@japa/runner'
import Professional from '#models/professional'
import Patient from '#models/patient'

test.group('Heart Rates - List', () => {
  test('should handle non-existing patient when retrieving heart rates', async ({
    assert,
    client,
  }) => {
    const professional = await Professional.firstOrFail()
    const response = await client.get('/v1/heart/rates/000000').loginAs(professional, [])

    response.assertStatus(404)
    assert.properties(response.body(), ['code', 'message', 'status'])

    assert.equal(response.body().code, 'E_PATIENT_NOT_FOUND')
  }).tags(['heart'])

  test('should return a 401 error if the user is not logged in', async ({ client, assert }) => {
    const response = await client.get('/v1/heart/rates/null')

    response.assertStatus(401)

    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  }).tags(['heart'])

  test('should get heart data for the similar patient', async ({ assert, client }) => {
    const patient = await Patient.findByOrFail('oidc_id', 'f875c155-9607-4aa3-af4e-59b3bff848ff')

    const response = await client.get(`/v1/heart/rates/${patient.id}`).loginAs(patient, [])
    response.assertStatus(200)
    assert.properties(response.body(), ['meta', 'data'])
  }).tags(['heart'])

  test('should return a 403 error if the user is not the same user', async ({ assert, client }) => {
    const patient = await Patient.findByOrFail('oidc_id', 'f875c155-9607-4aa3-af4e-59b3bff848ff')

    const response = await client
      .get('/v1/heart/rates/9498994932837253124945211')
      .loginAs(patient, [])
    response.assertStatus(403)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_PATIENT_HEART_UNAUTHORIZED')
  }).tags(['heart'])
})
