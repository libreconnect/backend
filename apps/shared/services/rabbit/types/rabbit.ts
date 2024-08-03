import { Channel, Connection, ConsumeMessage, Options, Replies } from 'amqplib'

declare module '@adonisjs/rabbit/types' {
  export interface RabbitManagerContract {
    hasChannel: boolean
    getConnection(): Promise<Connection>
    getChannel(): Promise<Channel>
    sendToQueue(queueName: string, content: any, options?: Options.Publish): Promise<boolean>
    consumeFrom<T extends object = any>(
      queueName: string,
      onMessage: (msg: T) => void | Promise<void>
    ): Promise<Replies.Consume>
    queueDeclare(queueName: string, options?: Options.AssertQueue): Promise<Replies.AssertQueue>
    exchangeDeclare(
      exchangeName: string,
      type: string,
      options?: Options.AssertExchange
    ): Promise<Replies.AssertExchange>
    bindQueue(queueName: string, exchangeName: string, routingKey: string): Promise<Replies.Empty>
  }

  export type Constructor<T> = new (...args: any[]) => T

  export type GetControllerHandlers<Controller extends Constructor<any>> = {
    [K in keyof InstanceType<Controller>]: InstanceType<Controller>[K] extends (ctx: any) => any
      ? K
      : never
  }[keyof InstanceType<Controller>]

  export type LazyImport<DefaultExport> = () => Promise<{ default: DefaultExport }>

  export interface RabbitConfig {
    user?: string
    password?: string
    hostname: string
    port?: number
    protocol?: string
  }

  export interface AmqpContext<T> {
    channel: Channel
    message: ConsumeMessage
    payload: T
  }

  export interface MessageContract {}
}
