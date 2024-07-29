import { Channel, Connection, Options } from 'amqplib'

declare module '@adonisjs/rabbit/types' {
  export interface RabbitManagerContract {
    hasChannel: boolean
    getConnection(): Promise<Connection>
    getChannel(): Promise<Channel>
    sendToQueue(queueName: string, content: any, options?: Options.Publish): Promise<boolean>
    consumeFrom<T extends object = any>(
      queueName: string,
      onMessage: (msg: T) => void | Promise<void>
    ): Promise<void>
    queueDeclare(queueName: string, options?: Options.AssertQueue): Promise<void>
    exchangeDeclare(
      exchangeName: string,
      type: string,
      options?: Options.AssertExchange
    ): Promise<void>
    bindQueue(queueName: string, exchangeName: string, routingKey: string): Promise<void>
  }

  export interface RabbitConfig {
    user?: string
    password?: string
    hostname: string
    port?: number
    protocol?: string
  }

  export interface MessageContract {}
}
