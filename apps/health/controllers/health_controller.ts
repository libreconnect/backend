import type { HttpContext } from '@adonisjs/core/http'
import { healthChecks } from '#start/health'

export default class HealthController {
  async readiness({ response }: HttpContext) {
    const report = await healthChecks.run()

    if (report.isHealthy) {
      return response.ok(report)
    }

    return response.serviceUnavailable(report)
  }

  async live({ response }: HttpContext) {
    return response.ok({ status: 'ok' })
  }
}
