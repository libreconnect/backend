import RabbitManager from '#apps/shared/services/rabbit/rabbit'
import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'

let rabbit: RabbitManager

await app.booted(async () => {
  rabbit = await app.container.make('rabbit')

  logger.info('Starting RabbitMQ')
  await rabbit.getChannel()
  await rabbit.initExchanges()
  await rabbit.initQueues()
})

export { rabbit as default }
