import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new patient.ts.
 */
export const createPatientValidator = vine.compile(
  vine.object({
    name: vine.string(),
    dateOfBirth: vine.string(),
    oidcId: vine.string(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing patient.ts.
 */
export const updatePatientValidator = vine.compile(
  vine.object({
    name: vine.string(),
    dateOfBirth: vine.date(),
    oidcId: vine.string(),
  })
)

export type CreatePatientSchema = Infer<typeof createPatientValidator>
export type UpdatePatientSchema = Infer<typeof updatePatientValidator>
