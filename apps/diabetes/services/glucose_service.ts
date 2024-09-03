import Glucose from '#models/glucose'
import { CreatePatientGlucoseSchema } from '#apps/diabetes/validators/patient_glucose'
import { DateTime } from 'luxon'

export default class GlucoseService {
  async findByPatientId(patientId: string) {
    return Glucose.query().where('patient_id', patientId)
  }

  async create({ patientId, data }: CreatePatientGlucoseSchema) {
    return Glucose.create({
      patientId: patientId,
      ...data,
      factoryTimestamp: data.factoryTimestamp ? DateTime.fromJSDate(data.factoryTimestamp) : null,
      timestamp: DateTime.fromJSDate(data.timestamp),
    })
  }
}
