import GlucoseService from '#apps/diabetes/services/glucose_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class PatientGlucoseController {
  constructor(private glucoseService: GlucoseService) {}

  async show({ params }: HttpContext) {
    const { patientId } = params

    logger.info('Fetching glycemia for patient %s', patientId)
    return this.glucoseService.findByPatientId(patientId)
  }
}
