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

  /**
   * @store
   * @responseBody 201 - <Patient>
   * @responseBody 403 - Forbidden
   * @responseBody 401 - Unauthorized
   * @requestBody <CreatePatientSchema>
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createPatientValidator)

    return this.patientService.create(data)
  }
}
