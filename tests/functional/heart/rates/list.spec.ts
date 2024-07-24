import KeycloakService from '#apps/authentication/services/keycloak_service'
import { keycloakUsers } from '#config/app'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Heart Rates List', () => {
  test('should handle non-existing patient when retrieving heart rates', async ({
    assert,
    client,
  }) => {
    const keycloakService = await app.container.make(KeycloakService)

    const accessToken = await keycloakService.createAccessToken(
      keycloakUsers.PROFESSIONNEL.username,
      keycloakUsers.PROFESSIONNEL.password
    )
    const response = await client
      .get('/v1/heart/rates/000000')
      .header('Authorization', `Bearer ${accessToken}`)

    response.assertStatus(404)
    assert.properties(response.body(), ['code', 'message', 'status'])

    assert.equal(response.body().code, 'E_PATIENT_NOT_FOUND')
  }).tags(['heart'])

  test('should return a 401 error if the user is not logged in', async ({ client, assert }) => {
    const response = await client.get('/v1/heart/rates/000000')

    response.assertStatus(401)

    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  }).tags(['heart'])
})
