import { AmqpContext } from '@adonisjs/rabbit/types'

export default class FooController {
  async test({ payload, message, channel }: AmqpContext<{ message: string }>) {
    console.log(payload)

    channel.ack(message)
  }
}
