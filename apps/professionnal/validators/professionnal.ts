import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createProfessionnalValidator = vine.compile(
  vine.object({
    name: vine.string(),
    speciality: vine.string(),
    licenceNumber: vine.string(),
    oidcId: vine.string(),
    companyId: vine.string(),
  })
)

export const updateProfessionnalValidator = vine.compile(vine.object({}))

export type CreateProfessionnalSchema = Infer<typeof createProfessionnalValidator>
export type UpdateProfessionnalSchema = Infer<typeof updateProfessionnalValidator>
