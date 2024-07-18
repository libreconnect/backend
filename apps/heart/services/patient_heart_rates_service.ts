import Heart from '#models/heart'
import { CreateHeartSchema, HeartQuerySchema } from '#apps/heart/validators/heart'
import logger from '@adonisjs/core/services/logger'
import HeartException from '#apps/heart/exceptions/heart_exception'

export default class PatientHeartRatesService {
  async findByPatientId({
    patientId,
    startDate,
    endDate,
    minHeartRate,
    maxHeartRate,
  }: HeartQuerySchema) {
    return Heart.query()
      .if(patientId, (query) => {
        query.where('patientId', patientId)
      })
      .if(startDate && startDate.isValid, (query) => {
        const dateStr = startDate.toISO()
        if (dateStr) {
          query.where('startDate', '>=', dateStr)
        }
      })
      .if(endDate && endDate.isValid, (query) => {
        const dateStr = endDate.toISO()
        if (dateStr) {
          query.where('endDate', '<=', dateStr)
        }
      })
      .if(minHeartRate, (query) => {
        query.where('heartRate', '>=', minHeartRate)
      })
      .if(maxHeartRate, (query) => {
        query.where('heartRate', '<=', maxHeartRate)
      })
  }

  async create(payload: CreateHeartSchema): Promise<Heart> {
    try {
      return Heart.create(payload)
    } catch (err) {
      logger.error(err)
      throw new HeartException('Failed to create heart rate data', {
        code: 'E_HEART_RATE_CREATE',
        status: 500,
      })
    }
  }
}
