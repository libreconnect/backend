import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

/**
 * Validator to validate the payload when creating
 * a new heart.ts.
 */
export const createHeartValidator = vine.compile(
  vine.object({
    patientId: vine.string().optional(),
    startDate: vine.date().optional(),
    endDate: vine.date().optional(),
    minHeartRate: vine.number(),
    maxHeartRate: vine.number(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing heart.ts.
 */
export const updateHeartValidator = vine.compile(
  vine.object({
    patientId: vine.string(),
    startDate: vine.string(),
    endDate: vine.string(),
    minHeartRate: vine.number(),
    maxHeartRate: vine.number(),
  })
)

export const HeartQueryValidator = vine.compile(
  vine.object({
    patientId: vine.string().optional(),
    startDate: vine.string().optional(),
    endDate: vine.string().optional(),
    minHeartRate: vine.number().optional(),
    maxHeartRate: vine.number().optional(),
  })
)

export type CreateHeartSchema = Infer<typeof createHeartValidator>

export interface UpdateHeartSchema {
  patientId: string
  startDate: DateTime
  endDate: DateTime
  minHeartRate: number
  maxHeartRate: number
}
