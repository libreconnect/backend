import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import string from '@adonisjs/core/helpers/string'

const STUBS_ROOT = new URL('./stubs', import.meta.url)

export default class GenerateModuleBase extends BaseCommand {
  static commandName = 'generate:module'
  static aliases = ['g:module']
  static description = 'Generate a module declaration'

  static options: CommandOptions = {}

  @args.string()
  declare name: string

  async run() {
    this.logger.info("Let's go to create your module")

    const codemods = await this.createCodemods()
    await Promise.all([
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'route.stub', { name: this.name }),
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'controller.stub', {
        name: this.name,
        module: this.name,
        includeServiceInjection: true,
      }),
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'validator.stub', {
        name: this.name,
        module: this.name,
        validatorName: string.pascalCase(this.name + 'Validator'),
        validatorFileName: `${string.pluralize(this.name)}_validator.ts`,
        createAction: string.camelCase('create' + this.name + 'Validator'),
        updateAction: string.camelCase('update' + this.name + 'Validator'),
      }),
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'service.stub', {
        name: this.name,
      }),
    ])

    try {
      await codemods.updateRcFile((rcFile) => {
        rcFile.addPreloadFile(`#apps/${this.name}/routes`)
      })
    } catch (error) {
      console.error('Unable to update adonisrc.ts file')
      console.error(error)
    }
  }
}
