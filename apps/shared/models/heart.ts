import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import Patient from '#models/patient'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Heart extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  // @example(johndoe@example.com)
  declare patientId: string

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @column()
  declare startDate: Date

  @column()
  declare endDate: Date

  @column()
  declare minHeartRate: number

  @column()
  declare maxHeartRate: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Heart) {
    model.id = generateSnowflake()
  }
}
