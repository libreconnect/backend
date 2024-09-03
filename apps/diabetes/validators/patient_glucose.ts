import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new patient_glucose.ts.
 */
export const createPatientGlucoseValidator = vine.compile(
  vine.object({
    patientId: vine.string(),
    data: vine.object({
      factoryTimestamp: vine.date().optional(),
      timestamp: vine.date(),
      type: vine.number().optional(),
      valueInMgPerDl: vine.number(),
      trendArrow: vine.number(),
      trendMessage: vine.string().optional().nullable(),
      measurementColor: vine.number(),
      glucoseUnits: vine.number(),
      value: vine.number(),
      isHigh: vine.boolean(),
      isLow: vine.boolean(),
      alarmType: vine.number().optional(),
    }),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing patient_glucose.ts.
 */
export const updatePatientGlucoseValidator = vine.compile(vine.object({}))

export type CreatePatientGlucoseSchema = Infer<typeof createPatientGlucoseValidator>
export type UpdatePatientGlucoseSchema = Infer<typeof updatePatientGlucoseValidator>
