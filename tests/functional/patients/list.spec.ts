import KeycloakService from '#apps/authentication/services/keycloak_service'
import Patient from '#apps/shared/models/patient'
import { keycloakUsers } from '#config/app'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Patients list', () => {
  test('should return a 403 error when a patient user accesses /v1/patients', async ({
    assert,
    client,
  }) => {
    const keycloakService = await app.container.make(KeycloakService)

    const accessToken = await keycloakService.createAccessToken(
      keycloakUsers.PATIENT.username,
      keycloakUsers.PATIENT.password
    )

    const response = await client
      .get('/v1/patients')
      .header('Authorization', `Bearer ${accessToken}`)

    response.assertStatus(403)

    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_PATIENT_FETCH_UNAUTHORIZED')
  }).tags(['patients'])

  test('should return a list of patients with meta and data properties for a professional user', async ({
    client,
    assert,
  }) => {
    const keycloakService = await app.container.make(KeycloakService)

    const accessToken = await keycloakService.createAccessToken(
      keycloakUsers.PROFESSIONNEL.username,
      keycloakUsers.PROFESSIONNEL.password
    )

    const response = await client
      .get('/v1/patients')
      .header('Authorization', `Bearer ${accessToken}`)

    response.assertStatus(200)
    assert.properties(response.body(), ['data', 'meta'])
  }).tags(['patients'])

  test('should return a 401 error if the user is not logged in', async ({ client, assert }) => {
    const response = await client.get('/v1/patients')

    response.assertStatus(401)

    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  }).tags(['patients'])

  test('tgest', async ({ client }) => {
    const patient = await Patient.firstOrFail()

    const response = await client.get('/v1/patients').loginAs(patient)
    console.log(response.body())

    //.header('Authorization', `Bearer ${accessToken}`)
  }).tags(['test'])
})
