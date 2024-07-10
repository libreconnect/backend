import Step from '#apps/shared/models/step'
import { CreateStepSchema, CreateStepsSchema } from '#apps/activity/validators/step'
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'

export default class StepService {
  async firstOrCreate(data: CreateStepSchema, patientId: string) {
    const startDate = DateTime.fromISO(data.startDate)
    const endDate = DateTime.fromISO(data.endDate)

    const startTimestamp = startDate.toMillis()
    const endTimestamp = endDate.toMillis()

    return Step.firstOrCreate(
      {
        patientId,
        endDate: endTimestamp,
        startDate: startTimestamp,
        step: data.steps,
      },
      {
        patientId,
        endDate: endTimestamp,
        startDate: startTimestamp,
        step: data.steps,
      }
    )
  }

  async createMany(dto: CreateStepsSchema, patientId: string) {
    logger.info(`Starting to create steps for patient ${patientId}`)
    const promises = dto.steps.map((step) => {
      return this.firstOrCreate(step, patientId)
        .then((result) => {
          logger.info(`step(${result.id}) created or found`)
          return result
        })
        .catch((error) => {
          logger.error(error)
        })
    })

    return Promise.all(promises)
  }
}
