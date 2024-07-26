import { patientPolicies } from '#apps/patient/policies'
import { heartPolicies } from '#apps/heart/policies'

export const policies = {
  ...patientPolicies,
  ...heartPolicies,
}
