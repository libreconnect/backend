import Professionnal from '#apps/shared/models/professionnal'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

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

  @hasMany(() => Professionnal)
  declare professionals: HasMany<typeof Professionnal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Company) {
    model.id = randomUUID()
  }
}
