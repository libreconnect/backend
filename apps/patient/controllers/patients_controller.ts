import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PatientService from '#apps/patient/services/patient_service'

@inject()
export default class PatientsController {
  constructor(private patientService: PatientService) {}

  async show({ params }: HttpContext) {
    return this.patientService.findById(params.id)
  }
}
