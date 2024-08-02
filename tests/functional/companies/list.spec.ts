import { test } from '@japa/runner'
import Professional from '#models/professional'

test.group('Companies list', () => {
  test('should return 403 for unauthorized user ', async ({ assert, client }) => {
    const professional = await Professional.firstOrFail()
    const response = await client.get('/v1/companies').loginAs(professional, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_COMPANY_UNAUTHORIZED')
  }).tags(['companies'])

  test('should return a 401 error if the user is not logged in', async ({ client, assert }) => {
    const response = await client.get('/v1/companies')
    response.assertStatus(401)

    assert.properties(response.body(), ['code', 'message', 'status'])
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  }).tags(['companies'])

  test('should return 200 for authorized user', async ({ client, assert }) => {
    const professional = await Professional.firstOrFail()
    const response = await client.get('/v1/companies').loginAs(professional, ['view_company'])

    response.assertStatus(200)
    assert.properties(response.body(), ['meta', 'data'])
  }).tags(['companies'])
})
