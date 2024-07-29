import { connect, Connection } from 'amqplib'
import { type RabbitConfig } from '@adonisjs/rabbit/types'

export default class RabbitConnection {
  hasConnection: boolean = false

  #connection?: Connection
  #connectionPromise?: Promise<Connection>

  readonly #credentials: string
  readonly #hostname: string
  readonly #protocol: string

  constructor(rabbitConfig: RabbitConfig) {
    this.#hostname = `${rabbitConfig.hostname}:${rabbitConfig.port}`
    this.#protocol = rabbitConfig.protocol || 'amqp://'
    this.#credentials = `${rabbitConfig.user}:${rabbitConfig.password}@`
  }

  get url() {
    return [this.#protocol, this.#credentials, this.#hostname].join('')
  }

  async getConnection(): Promise<Connection> {
    if (!this.#connection) {
      if (!this.#connectionPromise) {
        this.#connectionPromise = connect(this.url)
      }
      this.#connection = await this.#connectionPromise
    }

    return this.#connection
  }

  async closeConnection() {
    if (this.hasConnection && this.#connection) {
      await this.#connection.close()
      this.hasConnection = false
    }
  }
}
