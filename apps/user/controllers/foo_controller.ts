import { AmqpContext } from '@adonisjs/rabbit/types'
import vine from '@vinejs/vine'

export const fooValidator = vine.object({
  message: vine.string(),
})

export default class FooController {
  async test({ message, channel, request }: AmqpContext) {
    const data = await request.validateUsing(fooValidator)

    console.log(data)

    channel.ack(message)
  }
}
