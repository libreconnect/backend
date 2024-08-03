import PatientService from '#apps/patient/services/patient_service'
import ProfessionnalService from '#apps/professional/services/professional_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UserService {
  constructor(
    protected patientService: PatientService,
    protected professionalService: ProfessionnalService
  ) {}

  async status(oidcId: string) {
    try {
      const patient = await this.patientService.findByOidcId(oidcId)
      if (patient) {
        return {
          type: 'patient',
          patient,
        }
      }

      const professional = await this.professionalService.findByOidcId(oidcId)
      if (professional) {
        return {
          type: 'professional',
          professional,
        }
      }
    } catch (err) {
      throw err
    }

    return null
  }
}
