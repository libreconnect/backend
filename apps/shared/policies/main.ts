import { patientPolicies } from '#apps/patient/policies'
import { heartPolicies } from '#apps/heart/policies'
import { companiesPolicies } from '#apps/companies/policies'

export const policies = {
  ...patientPolicies,
  ...heartPolicies,
  ...companiesPolicies,
}
