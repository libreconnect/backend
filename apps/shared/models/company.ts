import Professional from '#models/professional'
import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import Patient from '#models/patient'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare country: string

  @column()
  declare zipCode: string

  @column()
  declare phone: string

  @column()
  declare email: string

  @column()
  declare nationalCode: string

  @hasMany(() => Professional)
  declare professionals: HasMany<typeof Professional>

  @manyToMany(() => Patient)
  declare patients: ManyToMany<typeof Patient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Company) {
    if (!model.id) {
      model.id = generateSnowflake()
    }
  }
}
