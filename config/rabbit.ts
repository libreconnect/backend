import env from '#start/env'
import { RabbitConfig } from '@adonisjs/rabbit/types'

const rabbitConfig: RabbitConfig = {
  connection: {
    hostname: env.get('RABBIT_HOST', 'localhost') as string,
    user: env.get('RABBIT_USER') as string,
    password: env.get('RABBIT_PASSWORD') as string,
    port: Number(env.get('RABBIT_PORT')),
  },
  exchanges: [
    {
      name: 'libreconnect_api_topic_exchange',
      type: 'topic',
      options: {
        durable: true,
      },
    },
  ],
  queues: [
    {
      consumerOptions: {
        autoAck: false,
        nackOnError: true,
        limitDelivery: 5,
        requeueOnError: true,
      },
      name: 'libreconnect_api_queue',
      bindings: [
        {
          exchange: 'libreconnect_api_topic_exchange',
          routingKey: 'libreconnect_api.v1',
        },
      ],
      options: {
        durable: true,
      },
    },
  ],
}

export default rabbitConfig
