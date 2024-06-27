import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new authentication.ts.
 */
export const createAuthenticationValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing authentication.ts.
 */
export const updateAuthenticationValidator = vine.compile(
  vine.object({})
)

export type CreateAuthenticationSchema = Infer<typeof createAuthenticationValidator>
export type UpdateAuthenticationSchema = Infer<typeof updateAuthenticationValidator>