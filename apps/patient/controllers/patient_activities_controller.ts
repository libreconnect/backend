import { HttpContext } from '@adonisjs/core/http'

export default class PatientActivitesController {
  async index({}: HttpContext) {
    return {
      message: 'This is the index method',
    }
  }
}
