import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Patient from '#apps/shared/models/patient'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'

export default class Glucose extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare patientId: string

  @column()
  declare factoryTimestamp: DateTime | null

  @column()
  declare timestamp: DateTime

  @column()
  declare type: number | null

  @column()
  declare valueInMgPerDl: number

  @column()
  declare trendArrow: number

  @column()
  declare trendMessage: string | null

  @column()
  declare measurementColor: number

  @column()
  declare glucoseUnits: number

  @column()
  declare value: number

  @column()
  declare isHigh: boolean

  @column()
  declare isLow: boolean

  @column()
  declare alarmType: number | null

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
