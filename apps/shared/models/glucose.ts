import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Patient from '#apps/shared/models/patient'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'

export default class Glucose extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  // @example(johndoe@example.com)
  declare patientId: string

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Glucose) {
    model.id = generateSnowflake()
  }
}
