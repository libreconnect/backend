import { test } from '@japa/runner'
import Professional from '#models/professional'

test.group('Professionals status', () => {
  test('should return professional if the user connected is similar with the sub id', async ({
    assert,
    client,
  }) => {
    const professional = await Professional.findByOrFail(
      'oidc_id',
      'b48b178d-1ed5-46b1-8379-9d9f80b3c75b'
    )

    const response = await client
      .get('/v1/professionals/status?sub=b48b178d-1ed5-46b1-8379-9d9f80b3c75b')
      .loginAs(professional, [])

    response.assertStatus(200)
    assert.include(response.body(), {
      name: 'Jinane',
      oidcId: 'b48b178d-1ed5-46b1-8379-9d9f80b3c75b',
      speciality: 'diabetic',
      licenceNumber: '3723719331',
      companyId: '5836049162517872642997799',
    })
  }).tags(['professionals'])

  test('should return 403 if the user connected is not similar with the sub id', async ({
    assert,
    client,
  }) => {
    const professional = await Professional.findByOrFail(
      'oidc_id',
      'c8d2fd2c-5c40-4e52-af58-134b7c8df323'
    )
    const response = await client
      .get('/v1/professionals/status?sub=b48b178d-1ed5-46b1-8379-9d9f80b3c75b')
      .loginAs(professional, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_PROFESSIONAL_UNAUTHORIZED')
  }).tags(['professionals'])
})
