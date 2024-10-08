import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'professionals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name').notNullable()
      table.string('oidc_id').unique().notNullable().index('oidc_id_professionnal_index')
      table.string('speciality').notNullable()
      table.string('licence_number').notNullable().unique()
      table
        .string('company_id')
        .references('id')
        .inTable('companies')
        .nullable()
        .index('company_id_index')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
