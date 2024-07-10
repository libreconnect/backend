import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
export const createStepObject = vine.object({
  steps: vine.number(),
  startDate: vine.string(),
  endDate: vine.string(),
})
export const createStepValidator = vine.compile(createStepObject)

export const createStepsValidator = vine.compile(
  vine.object({
    steps: vine.array(createStepObject),
  })
)

export type CreateStepsSchema = Infer<typeof createStepsValidator>
export type CreateStepSchema = Infer<typeof createStepValidator>
