import { HttpContext } from '@adonisjs/core/http'
import { createPatientGlucoseValidator } from '#apps/diabetes/validators/patient_glucose'
import GlucoseService from '#apps/diabetes/services/glucose_service'
import logger from '@adonisjs/core/services/logger'

export default class PatientGlucoseController {
  constructor(protected glucoseService: GlucoseService) {}

  async show({ params }: HttpContext) {
    const { patientId } = params

    logger.info('Fetching glycemia for patient %s', patientId)
    return this.glucoseService.findByPatientId(patientId)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createPatientGlucoseValidator)

    const glucose = await this.glucoseService.create(data)

    return response.created(glucose)
  }
}
