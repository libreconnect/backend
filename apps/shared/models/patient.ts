import { generateSnowflake } from '#apps/shared/services/snowflake_service'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Company from '#models/company'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare dateOfBirth: DateTime

  @column()
  declare oidcId: string

  @manyToMany(() => Company)
  declare companies: ManyToMany<typeof Company>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async generateUuid(model: Patient) {
    if (!model.id) {
      model.id = generateSnowflake()
    }
  }

  static accessTokens = DbAccessTokensProvider.forModel(Patient, {
    table: 'api_tokens',
    type: 'auth_token',
    tokenSecretLength: 30,
  })
}
