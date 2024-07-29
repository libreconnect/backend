import { test } from '@japa/runner'
import Professional from '#models/professional'
import { Roles } from '#apps/shared/interfaces/roles'

test.group('Companies create', () => {
  test('example test', async ({ assert, client }) => {
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
    response.assertStatus(200)
  }).tags(['companies'])
})
