import type { ApplicationService } from '@adonisjs/core/types'
import RabbitManager from '#apps/shared/services/rabbit/rabbit'
import rabbitConfig from '#config/rabbit'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('rabbit', () => {
      return new RabbitManager(rabbitConfig)
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
