import { Channel, Connection, Options, Replies } from 'amqplib'
import InMemoryChannel from '#apps/shared/services/rabbit/mock/in_memory_channel'
import RabbitManager from '#apps/shared/services/rabbit/rabbit'
import {
  type Constructor,
  type LazyImport,
  type GetControllerHandlers,
} from '@adonisjs/rabbit/types'

export default class RabbitMock extends RabbitManager {
  hasChannel: boolean = false
  #channel?: Channel

  constructor() {
    console.log('RabbitMock initialized')
    super({ connection: { hostname: 'localhost' }, exchanges: [], queues: [] })
  }

  async getConnection(): Promise<Connection> {
    return {} as Connection
  }

  async getChannel(): Promise<Channel> {
    if (!this.#channel) {
      this.#channel = new InMemoryChannel() as unknown as Channel
    }
    this.hasChannel = true
    return this.#channel
  }

  async sendToQueue(queueName: string, content: any, options?: Options.Publish): Promise<boolean> {
    const channel = await this.getChannel()
    return channel.sendToQueue(queueName, content, options)
  }

  consume<T extends Constructor<any>>(
    pattern: string,
    _handler: [LazyImport<T>, GetControllerHandlers<T>?]
  ) {
    this.#channel?.assertQueue(pattern)
  }

  async consumeFrom(
    queueName: string,
    onMessage: (msg: any, channel: Channel) => void | Promise<void>
  ): Promise<Replies.Consume> {
    const channel = await this.getChannel()
    return channel.consume(queueName, (msg) => {
      if (msg) {
        const content = msg.content.toString()
        const parsedContent = JSON.parse(content)
        onMessage(parsedContent, channel)
      }
    })
  }

  async queueDeclare(
    queueName: string,
    options?: Options.AssertQueue
  ): Promise<Replies.AssertQueue> {
    const channel = await this.getChannel()
    return channel.assertQueue(queueName, options)
  }

  async exchangeDeclare(
    exchangeName: string,
    _type: string,
    _options?: Options.AssertExchange
  ): Promise<Replies.AssertExchange> {
    // In-memory exchange declaration logic
    return Promise.resolve({ exchange: exchangeName })
  }

  async bindQueue(
    queueName: string,
    exchangeName: string,
    routingKey: string
  ): Promise<Replies.Empty> {
    const channel = await this.getChannel()
    return channel.bindQueue(queueName, exchangeName, routingKey)
  }

  async initExchanges(): Promise<void> {
    // Initialize in-memory exchanges
  }
}
