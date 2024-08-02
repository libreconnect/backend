import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new user.ts.
 */
export const createUserValidator = vine.compile(vine.object({}))

/**
 * Validator to validate the payload when updating
 * an existing user.ts.
 */
export const updateUserValidator = vine.compile(vine.object({}))

export type CreateUserSchema = Infer<typeof createUserValidator>
export type UpdateUserSchema = Infer<typeof updateUserValidator>
