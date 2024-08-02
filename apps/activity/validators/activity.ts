import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new activity.ts.
 */
export const createActivityValidator = vine.compile(vine.object({}))

/**
 * Validator to validate the payload when updating
 * an existing activity.ts.
 */
export const updateActivityValidator = vine.compile(vine.object({}))

export type CreateActivitySchema = Infer<typeof createActivityValidator>
export type UpdateActivitySchema = Infer<typeof updateActivityValidator>
