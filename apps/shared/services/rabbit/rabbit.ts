import {
  RabbitManagerContract,
  type RabbitConfig,
  type GetControllerHandlers,
  type Constructor,
} from '@adonisjs/rabbit/types'
import RabbitConnection from '#apps/shared/services/rabbit/rabbit_connection'
import { Channel, Connection, Options, Replies } from 'amqplib'
import { LazyImport } from '@adonisjs/bouncer/types'
import { Route } from '#apps/shared/services/rabbit/route'
import logger from '@adonisjs/core/services/logger'
import AmqpRequest from '#apps/shared/services/rabbit/request'

export default class RabbitManager implements RabbitManagerContract {
  private readonly rabbitConnection: RabbitConnection
  hasChannel: boolean = false

  #channelPromise?: Promise<Channel>
  #channel?: Channel
  #config: RabbitConfig

  routes: Route[] = []

  constructor(rabbitConfig: RabbitConfig) {
    this.rabbitConnection = new RabbitConnection(rabbitConfig)
    this.#config = rabbitConfig
    logger.info('RabbitManager initialized')
  }

  private toBuffer(content: string | object | Buffer): Buffer {
    if (typeof content === 'string') {
      // Si le contenu est une chaîne, convertissez-la en Buffer
      return Buffer.from(content)
    } else if (content instanceof Buffer) {
      // Si le contenu est déjà un Buffer, retournez-le tel quel
      return content
    } else if (typeof content === 'object') {
      // Si le contenu est un objet, convertissez-le en Buffer en le transformant en JSON
      const jsonString = JSON.stringify(content)
      return Buffer.from(jsonString)
    } else {
      // Si le type n'est pas pris en charge, lancez une erreur ou adoptez un comportement par défaut
      throw new Error('Type de contenu non pris en charge')
    }
  }

  async getConnection(): Promise<Connection> {
    return this.rabbitConnection.getConnection()
  }

  async getChannel(): Promise<Channel> {
    const connection = await this.rabbitConnection.getConnection()

    if (!this.hasChannel || this.#channel) {
      if (!this.#channelPromise) {
        this.#channelPromise = connection.createChannel()
      }
      this.#channel = await this.#channelPromise
      this.hasChannel = true
    }

    return this.#channel!
  }

  async sendToQueue(queueName: string, content: any, options?: Options.Publish) {
    const channel = await this.getChannel()

    return channel.sendToQueue(queueName, this.toBuffer(content), options)
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
    type: string,
    options?: Options.AssertExchange
  ): Promise<Replies.AssertExchange> {
    const channel = await this.getChannel()

    return channel.assertExchange(exchangeName, type, options)
  }

  async bindQueue(
    queueName: string,
    exchangeName: string,
    routingKey: string
  ): Promise<Replies.Empty> {
    const channel = await this.getChannel()

    return channel.bindQueue(queueName, exchangeName, routingKey)
  }

  async closeChannel() {
    if (!this.hasChannel && this.#channel) {
      await this.#channel.close()
      this.hasChannel = false
    }
  }

  #pushToRoutes(route: Route<any>) {
    this.routes.push(route)
  }

  consume<T extends Constructor<any>>(
    pattern: string,
    handler: [LazyImport<T>, GetControllerHandlers<T>?]
  ) {
    const route = new Route<T>({ pattern, handler })
    this.#pushToRoutes(route)
  }

  async closeConnection() {
    await this.closeChannel()
    await this.rabbitConnection.closeConnection()
  }

  async initExchanges() {
    for (const exchange of this.#config.exchanges) {
      await this.exchangeDeclare(exchange.name, exchange.type, exchange.options)
    }
  }

  async initQueues() {
    for (const queue of this.#config.queues) {
      const options = { ...queue.options }

      if (queue.consumerOptions?.limitDelivery) {
        options.arguments = {
          'x-delivery-limit': queue.consumerOptions.limitDelivery,
          'x-queue-type': 'quorum',
        }
      }

      await this.queueDeclare(queue.name, options)
      if (queue.bindings) {
        for (const binding of queue.bindings) {
          await this.bindQueue(queue.name, binding.exchange, binding.routingKey)
        }
      }
    }
  }

  async start() {
    const channel = await this.getChannel()
    const queues = this.#config.queues
    const defaultConsumerOptions = {
      autoAck: true,
      nackOnError: true,
      limitDelivery: 100,
      requeueOnError: false,
    }

    for (const route of this.routes) {
      const queueConfig = queues.find((queue) => queue.name === route.pattern)
      const consumerOptions = queueConfig?.consumerOptions || defaultConsumerOptions

      await channel.consume(route.pattern, async (message) => {
        if (message) {
          try {
            const parsedMessage = JSON.parse(message.content.toString())
            await route.execute({
              payload: parsedMessage,
              message,
              channel,
              request: new AmqpRequest(parsedMessage),
            })

            if (!consumerOptions.autoAck) {
              channel.ack(message)
            }
          } catch (error) {
            if (!consumerOptions.requeueOnError) {
              logger.error(`Error processing message ${message.fields.deliveryTag}`, error.message)
              channel.nack(message, false, false)
              return
            }

            if (consumerOptions.nackOnError) {
              channel.nack(message)
              return
            }
          }
        }
      })
    }
  }
}
