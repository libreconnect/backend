import { Options, Replies } from 'amqplib'

export default class InMemoryChannel {
  queues: Map<string, any[]> = new Map()

  assertQueue(queueName: string, _options?: Options.AssertQueue): Promise<Replies.AssertQueue> {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, [])
    }
    return Promise.resolve({ queue: queueName, messageCount: 0, consumerCount: 0 })
  }

  bindQueue(
    _queueName: string,
    _exchangeName: string,
    _routingKey: string
  ): Promise<Replies.Empty> {
    // In-memory binding logic (could just be a no-op or you could track it in an array)
    return Promise.resolve({})
  }

  consume(queueName: string, onMessage: (msg: any) => void): Promise<Replies.Consume> {
    if (!this.queues.has(queueName)) {
      throw new Error(`Queue ${queueName} does not exist`)
    }

    // Simulate consuming messages
    const messages = this.queues.get(queueName) || []
    messages.forEach((message) => onMessage(message))

    return Promise.resolve({ consumerTag: 'in-memory-consumer' })
  }

  sendToQueue(queueName: string, content: any, _options?: Options.Publish): Promise<boolean> {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, [])
    }

    this.queues.get(queueName)?.push(content)
    return Promise.resolve(true)
  }

  ack(_message: any) {
    // Acknowledge message
  }

  nack(_message: any) {
    // Negative acknowledge message
  }
}
