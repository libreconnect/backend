import PatientException from '#apps/patient/exceptions/patient_exception'
import Patient from '#apps/shared/models/patient'
import { CreatePatientSchema, PatientsQuerySchema } from '#apps/patient/validators/patient'
import logger from '@adonisjs/core/services/logger'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import ProfessionnalService from '#apps/professionnal/services/professionnal_service'

@inject()
export default class PatientService {
  constructor(private professionnalService: ProfessionnalService) {}

  async findAll({ page = 1, limit = 10 }: PatientsQuerySchema, professionnalOidcId: string) {
    try {
      await this.professionnalService.findByOidcId(professionnalOidcId)
      return Patient.query().paginate(page, limit)
    } catch (err) {
      throw new PatientException('Cannot access', {
        code: 'E_PATIENT_FETCH_UNAUTHORIZED',
        status: 403,
      })
    }
  }

  async findById(patientId: string) {
    try {
      return await Patient.query().where('id', patientId).firstOrFail()
    } catch (err) {
      throw new PatientException(err.message, {
        code: 'E_PATIENT_NOT_FOUND',
        status: 404,
      })
    }
  }

  async findByOidcId(oidcId: string) {
    return Patient.query().where('oidc_id', oidcId).firstOrFail()
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
