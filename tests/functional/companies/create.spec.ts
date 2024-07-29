import { test } from '@japa/runner'
import Professional from '#models/professional'
import { Roles } from '#apps/shared/interfaces/roles'

test.group('Companies create', () => {
  test('should create a company and return a 201 status if the authenticated user has the necessary permission', async ({
    assert,
    client,
  }) => {
    const professional = await Professional.firstOrFail()

    const response = await client
      .post('/v1/companies')
      .loginAs(professional, [Roles.COMPANY_CREATOR])
      .json({
        name: 'Company name',
        address: 'Company address',
        city: 'Company city',
        country: 'Company country',
        zipCode: 'Company zipCode',
        phone: 'Company phone',
        nationalCode: 'DZAD82D71D12',
      })

    assert.properties(response.body(), [
      'id',
      'name',
      'address',
      'city',
      'country',
      'zipCode',
      'phone',
      'nationalCode',
    ])
    response.assertStatus(201)
  }).tags(['companies'])
})

test('should return a 403 error if the authenticated user does not have the necessary permission', async ({
  assert,
  client,
}) => {
  const professional = await Professional.firstOrFail()

  const response = await client.post('/v1/companies').loginAs(professional, []).json({
    name: 'Company name',
    address: 'Company address',
    city: 'Company city',
    country: 'Company country',
    zipCode: 'Company zipCode',
    phone: 'Company phone',
    nationalCode: 'DZAD82D71D12',
  })

  response.assertStatus(403)
  assert.properties(response.body(), ['code', 'message', 'status'])
  assert.equal(response.body().code, 'E_COMPANY_UNAUTHORIZED')
}).tags(['companies'])

test('should return a 401 error if the user is not logged in', async ({ client, assert }) => {
  const response = await client.post('/v1/companies')

  response.assertStatus(401)

  assert.properties(response.body(), ['code', 'message', 'status'])
  assert.equal(response.body().code, 'E_AUTHENTICATION_UNAUTHORIZED')
}).tags(['companies'])
