import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PatientHeartRatesService from '#apps/heart/services/patient_heart_rates_service'
import logger from '@adonisjs/core/services/logger'
import { createHeartValidator, HeartQueryValidator } from '#apps/heart/validators/heart'

@inject()
export default class PatientHeartRatesController {
  constructor(private heartService: PatientHeartRatesService) {}

  async show({ params }: HttpContext) {
    logger.info('Fetching heart rate for patient %s', params.id)
    const data = await params.validateUsing(HeartQueryValidator)

    return this.heartService.findByPatientId(data.patientId)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createHeartValidator)

    return this.heartService.create(data)
  }
}
