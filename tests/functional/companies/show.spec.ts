import { test } from '@japa/runner'
import Patient from '#models/patient'
import Professional from '#models/professional'

test.group('Companies show', () => {
  test('should return 401 when not authenticated', async ({ client, assert }) => {
    const response = await client.get('/v1/companies/5836049162517872642997799')

    response.assertStatus(401)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  }).tags(['companies'])

  test('should return 403 for patient', async ({ assert, client }) => {
    const user = await Patient.findByOrFail('oidc_id', '9f6ca596-908e-4a53-a977-c2065cf98e44')
    const response = await client.get('/v1/companies/5836049162517872642997799').loginAs(user, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_COMPANY_UNAUTHORIZED')
  }).tags(['companies'])

  test('should return 403 for unauthorized professional', async ({ client, assert }) => {
    const user = await Professional.findByOrFail('oidc_id', '77a1e767-a964-4df4-bda8-28529c243441')

    const response = await client.get('/v1/companies/9336049162517872642997616').loginAs(user, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_COMPANY_UNAUTHORIZED')
  }).tags(['companies'])

  test('should return 200 for authorized professional', async ({ client, assert }) => {
    const user = await Professional.findByOrFail('oidc_id', '77a1e767-a964-4df4-bda8-28529c243441')

    const response = await client.get('/v1/companies/5836049162517872642997799').loginAs(user, [])

    response.assertStatus(200)
    assert.include(response.body(), {
      id: '5836049162517872642997799',
      name: 'Centre Hospitalier Universitaire Lapeyronie',
      address: '371 Avenue Du Doyen Gaston Giraud',
      city: 'Montpellier',
      country: 'France',
      zipCode: '34295',
      phone: '0467336733',
      email: 'contact@lapeyronie.fr',
      nationalCode: '340785161',
    })
  }).tags(['companies'])
})
