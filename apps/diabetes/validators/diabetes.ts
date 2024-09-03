import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new diabetes.ts.
 */
export const createDiabetesValidator = vine.compile(vine.object({}))

/**
 * Validator to validate the payload when updating
 * an existing diabetes.ts.
 */
export const updateDiabetesValidator = vine.compile(vine.object({}))

export type CreateDiabetesSchema = Infer<typeof createDiabetesValidator>
export type UpdateDiabetesSchema = Infer<typeof updateDiabetesValidator>
