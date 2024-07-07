import AuthenticationService from '#apps/authentication/services/authentication_service'
import PatientService from '#apps/patient/services/patient_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { createStepsValidator } from '#apps/activity/validators/step'
import StepService from '#apps/activity/services/step_service'

@inject()
export default class StepsController {
  constructor(
    private authenticationService: AuthenticationService,
    private patientService: PatientService,
    private stepService: StepService
  ) {}

  async index({}: HttpContext) {
    return 'Hello World'
  }

  async store({ auth, request }: HttpContext) {
    const dto = await request.validateUsing(createStepsValidator)
    const guard: string = auth.authenticatedViaGuard as string
    const oidcId = this.authenticationService.getOidcId(guard, auth.user)
    const patient = await this.patientService.findByOidcId(oidcId)

    return this.stepService.createMany(dto, patient.id)
  }
}
