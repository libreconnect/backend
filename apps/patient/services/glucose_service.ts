import Glucose from '#apps/shared/models/glucose'

export default class GlucoseService {
  async findByPatientId(patientId: string) {
    return Glucose.query().where('patient_id', patientId)
  }
}
