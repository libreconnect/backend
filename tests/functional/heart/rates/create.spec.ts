import { test } from '@japa/runner'
import Patient from '#models/patient'

test.group('Heart Rates - Create', () => {
  test('should reject unauthenticated user trying to create heart rate data', async ({
    assert,
    client,
  }) => {
    const response = await client.post('/v1/heart/rates')

    response.assertStatus(401)

    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
  })

  test('should create heart rate data successfully for himself', async ({ assert, client }) => {
    const patient = await Patient.firstOrFail()

    const response = await client
      .post('/v1/heart/rates')
      .json({
        patientId: patient.id,
        startDate: '2024-05-05',
        value: 100,
      })
      .loginAs(patient, [])

    response.assertStatus(201)
    assert.properties(response.body(), [
      'patientId',
      'value',
      'startDate',
      'endDate',
      'id',
      'createdAt',
      'updatedAt',
    ])
  })

  test('should reject unauthorized user trying to create heart rate data', async ({
    assert,
    client,
  }) => {
    const patient = await Patient.firstOrFail()

    const response = await client
      .post('/v1/heart/rates')
      .json({
        patientId: '1234',
        startDate: '2024-05-05',
        value: 100,
      })
      .loginAs(patient, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_HEART_CREATION_UNAUTHORIZED')
  })
})
