import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

export default class Documentation extends BaseCommand {
  static commandName = 'docs:generate'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  async run() {
    const Router = await this.app.container.make('router')
    Router.commit()
    await AutoSwagger.default.writeFile(Router.toJSON(), swagger)
  }
}
