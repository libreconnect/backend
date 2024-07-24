import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import Patient from '#models/patient'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class HeartRate extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare patientId: string

  @column()
  declare startDate: number

  @column()
  declare endDate: number

  @column()
  declare value: number

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: HeartRate) {
    model.id = generateSnowflake()
  }
}
