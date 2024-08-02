import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Company from '#apps/shared/models/company'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Professional extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare oidcId: string

  @column()
  declare speciality: string

  @column()
  declare licenceNumber: string

  @column()
  declare companyId: string

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Professional) {
    if (!model.id) {
      model.id = generateSnowflake()
    }
  }
}
