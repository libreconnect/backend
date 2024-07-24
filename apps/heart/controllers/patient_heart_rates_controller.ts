import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PatientHeartRatesService from '#apps/heart/services/patient_heart_rates_service'
import logger from '@adonisjs/core/services/logger'
import { createHeartValidator, heartQueryValidator } from '#apps/heart/validators/heart'
import PatientService from '#apps/patient/services/patient_service'

@inject()
export default class PatientHeartRatesController {
  constructor(
    private patientHeartRatesService: PatientHeartRatesService,
    private patientService: PatientService
  ) {}

  /**
   * @show
   * @summary List all heart rates for a patient
   * @responseBody 200 - <HeartRate[]>.paginated()
   * @responseBody 403 - Forbidden
   * @responseBody 401 - Unauthorized
   * @paramQuery startDate - Range of dates - @type(string)
   * @paramQuery endDate - Range of dates - @type(string)
   * @paramQuery minHeartRate - Set minimum heart rate - @type(number)
   * @paramQuery maxHeartRate - Set maximum heart rate - @type(number)
   */
  async show({ request, params }: HttpContext) {
    const data = await request.validateUsing(heartQueryValidator)
    const patient = await this.patientService.findById(params.patientId)

    logger.info('Fetching heart rate for patient %s', params.patientId)
    return this.patientHeartRatesService.findByPatientId(data, patient.id)
  }

  /**
   * @store
   * @summary Create heart rate data for a patient
   * @responseBody 201 - <Heart>
   * @responseBody 403 - Forbidden
   * @responseBody 401 - Unauthorized
   * @requestBody <createHeartValidator>
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createHeartValidator)

    return this.patientHeartRatesService.create(data)
  }
}
