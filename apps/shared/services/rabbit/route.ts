import type {
  Constructor,
  LazyImport,
  GetControllerHandlers,
  AmqpContext,
} from '@adonisjs/rabbit/types'
import { moduleImporter } from '@adonisjs/fold'

export class Route<Controller extends Constructor<any> = any> {
  readonly #pattern: string
  readonly #handler: any

  constructor(options: {
    pattern: string
    handler: [LazyImport<Controller>, GetControllerHandlers<Controller>?]
  }) {
    this.#pattern = options.pattern
    this.#handler = this.#resolveRouteHandle(options.handler)
  }

  #resolveRouteHandle(handler: [LazyImport<Controller>, GetControllerHandlers<Controller>?]) {
    if (Array.isArray(handler)) {
      return {
        reference: handler,
        ...moduleImporter(handler[0], (handler[1] || 'handle') as string).toHandleMethod(),
      }
    }
  }

  async execute(data: AmqpContext) {
    const { reference } = this.#handler

    const [importModule, methodName] = reference
    const module = await importModule()
    const instance = new module.default()
    const handler = instance[methodName]
    if (handler) {
      await handler.call(instance, data)
    } else {
      console.log(`Handler ${methodName} not found on controller.`)
    }
  }

  get pattern() {
    return this.#pattern
  }
}
