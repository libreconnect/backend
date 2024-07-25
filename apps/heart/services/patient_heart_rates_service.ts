import { CreateHeartSchema, HeartQuerySchema } from '#apps/heart/validators/heart'
import logger from '@adonisjs/core/services/logger'
import HeartRate from '#apps/shared/models/heart_rate'
import { DateTime } from 'luxon'
import HeartException from '../exceptions/heart_exception.js'

export default class PatientHeartRatesService {
  async findByPatientId(
    { startDate, endDate, minHeartRate, maxHeartRate, page = 1, limit = 10 }: HeartQuerySchema,
    patientId: string
  ) {
    return HeartRate.query()
      .where('patient_id', patientId)
      .if(startDate, (query) => {
        // TODO: Fix this
        query.where('created_at', '>=', startDate!)
      })
      .if(endDate, (query) => {
        // TODO: Fix this
        query.where('created_at', '<=', endDate!)
      })
      .if(minHeartRate, (query) => {
        query.where('value', '>=', minHeartRate!)
      })
      .if(maxHeartRate, (query) => {
        query.where('value', '<=', maxHeartRate!)
      })
      .paginate(page, limit)
  }

  async create(payload: CreateHeartSchema) {
    try {
      const startDate = DateTime.fromISO(payload.startDate)

      return HeartRate.create({
        patientId: payload.patientId,
        value: payload.value,
        startDate: startDate.toMillis(),
        endDate: payload.endDate
          ? DateTime.fromISO(payload.endDate).toMillis()
          : startDate.toMillis(),
      })
    } catch (err) {
      logger.error(err)
      throw new HeartException('Failed to create heart rate data', {
        code: 'E_HEART_RATE_CREATE',
        status: 500,
      })
    }
  }
}
