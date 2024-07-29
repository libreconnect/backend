import RabbitManager from '#apps/shared/services/rabbit/rabbit'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    rabbit: RabbitManager
  }
}
