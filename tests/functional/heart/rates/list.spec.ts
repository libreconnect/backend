import { test } from '@japa/runner'
import Professional from '#models/professional'

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
})
