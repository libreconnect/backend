import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'company_patient'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('company_id').references('id').inTable('companies').onDelete('CASCADE')
      table.string('patient_id').references('id').inTable('patients').onDelete('CASCADE')

      table.unique(['company_id', 'patient_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
