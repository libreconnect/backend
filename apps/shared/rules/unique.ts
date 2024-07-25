import db from '@adonisjs/lucid/services/db'
import vine, { VineString } from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  column: string
}

async function unique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const row = await db.from(options.table).where(options.column, value).first()

  if (row) {
    field.report('The {{ field }} field is not unique', 'unique', field)
  }
}

export const uniqueRule = vine.createRule(unique)

declare module '@vinejs/vine' {
  interface VineString {
    unique(options: Options): this
  }
}

VineString.macro('unique', function (this: VineString, options: Options) {
  return this.use(uniqueRule(options))
})
