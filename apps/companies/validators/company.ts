import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new company.ts.
 */
export const createCompanyValidator = vine.compile(
  vine.object({
    name: vine.string(),
    address: vine.string(),
    city: vine.string(),
    country: vine.string(),
    zipCode: vine.string(),
    phone: vine.string(),
    email: vine.string().optional(),
    nationalCode: vine.string(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing company.ts.
 */
export const updateCompanyValidator = vine.compile(vine.object({}))

export const getComaniesValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
    nationalCode: vine.string().optional(),
    search: vine.string().optional(),
  })
)

export type CreateCompaniesSchema = Infer<typeof createCompanyValidator>
export type UpdateCompaniesSchema = Infer<typeof updateCompanyValidator>
export type GetCompaniesSchema = Infer<typeof getComaniesValidator>
