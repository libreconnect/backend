import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createProfessionalValidator = vine.compile(
  vine.object({
    name: vine.string(),
    speciality: vine.string(),
    licenceNumber: vine.string(),
    oidcId: vine.string(),
    companyId: vine.string(),
  })
)

export const updateProfessionalValidator = vine.compile(vine.object({}))

export const getProfessionalStatusValidator = vine.compile(
  vine.object({
    sub: vine.string(),
  })
)

export type CreateProfessionalSchema = Infer<typeof createProfessionalValidator>
export type UpdateProfessionalSchema = Infer<typeof updateProfessionalValidator>
export type GetProfessionalStatusSchema = Infer<typeof getProfessionalStatusValidator>
