import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'heart_rates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table
        .string('patient_id')
        .notNullable()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE')
      table.string('start_date').notNullable()
      table.string('end_date').notNullable()
      table.integer('value').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
