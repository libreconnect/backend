import { test } from '@japa/runner'
import env from '#start/env'

test.group('Health ping', () => {
  test('Health Live Endpoint Should Return 200 When Correct Secret Is Provided', async ({
    assert,
    client,
  }) => {
    const response = await client
      .get('/health/live')
      .header('x-monitoring-secret', env.get('APP_KEY'))

    response.assertStatus(200)
    assert.properties(response.body(), ['status'])
    assert.equal(response.body().status, 'ok')
  })

  test('Health Live Endpoint Should Return 401 When No Secret Is Provided', async ({
    assert,
    client,
  }) => {
    const response = await client.get('/health/live')

    response.assertStatus(401)
    assert.properties(response.body(), ['message', 'status', 'code'])

    assert.equal(response.body().message, 'Unauthorized access')
    assert.equal(response.body().status, 401)
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  })

  test('Health Readiness Endpoint Should Return 200 When Correct Secret Is Provided', async ({
    client,
    assert,
  }) => {
    const response = await client
      .get('/health/readiness')
      .header('x-monitoring-secret', env.get('APP_KEY'))

    response.assertStatus(200)
    assert.properties(response.body(), ['isHealthy', 'status'])

    assert.equal(response.body().isHealthy, true)
    assert.equal(response.body().status, 'ok')
  })

  test('Health Readiness Endpoint Should Return 401 When No Secret Is Provided', async ({
    client,
    assert,
  }) => {
    const response = await client.get('/health/readiness')

    response.assertStatus(401)
    assert.properties(response.body(), ['message', 'status', 'code'])

    assert.equal(response.body().message, 'Unauthorized access')
    assert.equal(response.body().status, 401)
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  })

  test('Health Readiness Endpoint Should Return 401 When Wrong Secret Is Provided', async ({
    client,
    assert,
  }) => {
    const response = await client
      .get('/health/readiness')
      .header('x-monitoring-secret', 'wrong_secret')

    response.assertStatus(401)
    assert.properties(response.body(), ['message', 'status', 'code'])

    assert.equal(response.body().message, 'Unauthorized access')
    assert.equal(response.body().status, 401)
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  })

  test('Health Live Endpoint Should Return 401 When Wrong Secret Is Provided', async ({
    client,
    assert,
  }) => {
    const response = await client.get('/health/live').header('x-monitoring-secret', 'wrong_secret')

    response.assertStatus(401)
    assert.properties(response.body(), ['message', 'status', 'code'])

    assert.equal(response.body().message, 'Unauthorized access')
    assert.equal(response.body().status, 401)
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  })
})
