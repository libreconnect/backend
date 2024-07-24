import { BaseCommand, args } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const STUBS_ROOT = new URL('./stubs', import.meta.url)
export default class MakeModuleService extends BaseCommand {
  static commandName = 'generate:service'
  static aliases = ['g:service']
  static description = 'Generate a service in given module'

  static options: CommandOptions = {}

  @args.string()
  declare name: string

  async run() {
    const availableModuleNames = await readdir(join(process.cwd(), 'apps'))
    const module = await this.prompt.choice('Choose your module', availableModuleNames)

    const codemods = await this.createCodemods()

    await Promise.all([
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'service.stub', {
        name: this.name,
        module,
      }),
    ])
  }
}
