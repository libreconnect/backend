import PatientException from '#apps/patient/exceptions/patient_exception'
import Patient from '#apps/shared/models/patient'
import { CreatePatientSchema } from '#apps/patient/validators/patient'
import logger from '@adonisjs/core/services/logger'
import { DateTime } from 'luxon'

export default class PatientService {
  async findAll() {
    return Patient.query().paginate(1, 10)
  }
  async findById(patientId: string) {
    try {
      return await Patient.query().where('id', patientId).firstOrFail()
    } catch {
      throw new PatientException('Patient not found', {
        code: 'E_PATIENT_NOT_FOUND',
        status: 404,
      })
    }
  }

  async findByOidcId(oidcId: string) {
    return Patient.query().where('oidc_id', oidcId).first()
  }

  async create(payload: CreatePatientSchema) {
    const date = DateTime.fromISO(payload.dateOfBirth)
    try {
      await Patient.create({
        ...payload,
        dateOfBirth: date,
      })
    } catch (err) {
      logger.error(err)
      throw new PatientException('Failed to create user', {
        code: 'E_PATIENT_CREATE',
        status: 500,
      })
    }
  }
}
