import PatientService from '#apps/patient/services/patient_service'
import ProfessionnalService from '#apps/professionnal/services/professionnal_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UserService {
  constructor(
    protected patientService: PatientService,
    protected professionnalService: ProfessionnalService
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

      const professionnal = await this.professionnalService.findByOidcId(oidcId)
      if (professionnal) {
        return {
          type: 'professionnal',
          professionnal,
        }
      }
    } catch (err) {
      throw err
    }

    return null
  }
}
