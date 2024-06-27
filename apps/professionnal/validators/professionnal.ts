import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new professionnal.ts.
 */
export const createProfessionnalValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing professionnal.ts.
 */
export const updateProfessionnalValidator = vine.compile(
  vine.object({})
)

export type CreateProfessionnalSchema = Infer<typeof createProfessionnalValidator>
export type UpdateProfessionnalSchema = Infer<typeof updateProfessionnalValidator>