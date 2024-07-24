import KeycloakService from '#apps/authentication/services/keycloak_service'
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
      keycloakUsers.PROFESSIONNEL.username,
      keycloakUsers.PROFESSIONNEL.password
    )

    const response = await client
      .get('/v1/patients')
      .header('Authorization', `Bearer ${accessToken}`)

    response.assertStatus(403)

    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_PATIENT_FETCH_UNAUTHORIZED')
  })
})
