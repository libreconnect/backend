import PatientException from '#apps/patient/exceptions/patient_exception'
import Patient from '#apps/patient/models/patient'

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
}
