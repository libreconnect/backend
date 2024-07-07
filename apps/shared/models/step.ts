import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import Patient from '#apps/shared/models/patient'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Step extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare patientId: string

  @column()
  declare step: number

  @column()
  declare startDate: number

  @column()
  declare endDate: number

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Step) {
    model.id = generateSnowflake()
  }
}
