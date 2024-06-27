import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new patient.ts.
 */
export const createPatientValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing patient.ts.
 */
export const updatePatientValidator = vine.compile(
  vine.object({})
)

export type CreatePatientSchema = Infer<typeof createPatientValidator>
export type UpdatePatientSchema = Infer<typeof updatePatientValidator>