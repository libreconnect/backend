import RabbitManager from '#apps/shared/services/rabbit/rabbit'
import app from '@adonisjs/core/services/app'

let rabbit: RabbitManager

await app.booted(async () => {
  rabbit = await app.container.make('rabbit')

  await rabbit.getChannel()
})

export { rabbit as default }
