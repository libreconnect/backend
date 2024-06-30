import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PatientService from '#apps/patient/services/patient_service'
import { createPatientValidator } from '#apps/patient/validators/patient'

@inject()
export default class PatientsController {
  constructor(private patientService: PatientService) {}

  async show({ params }: HttpContext) {
    return this.patientService.findById(params.id)
  }

  async create({ request }: HttpContext) {
    const data = await request.validateUsing(createPatientValidator)

    return this.patientService.create(data)
  }
}
