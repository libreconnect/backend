import Heart from '#models/heart'
import { CreateHeartSchema } from '#apps/heart/validators/heart'
import logger from '@adonisjs/core/services/logger'
import HeartException from '#apps/heart/exceptions/heart_exception'

export default class PatientHeartRatesService {
  async findByPatientId(patientId: string) {
    return Heart.query().where('patient_id', patientId)
  }

  async create(payload: CreateHeartSchema): Promise<Heart> {
    try {
      return Heart.create(payload)
    } catch (err) {
      logger.error(err)
      throw new HeartException('Failed to create heart rate data', {
        code: 'E_HEART_CREATE',
        status: 500,
      })
    }
  }
}
