import { BaseCommand, args } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import string from '@adonisjs/core/helpers/string'
import { promises as fs } from 'node:fs'
import { basename, join } from 'node:path'

export default class MakeUtil extends BaseCommand {
  static commandName = 'make:util'
  static description = 'Create a new utility class inside app/utils'
  static options: CommandOptions = {}

  @args.string({ description: 'Name of the utility class' })
  declare name: string

  async run() {
    const targetPath = this.name.toLowerCase()
    const fileOnly = basename(targetPath)
    
    const className = string.pascalCase(fileOnly)
    const folderPath = this.app.makePath('app/utils')
    const filePath = join(folderPath, `${targetPath}.ts`)

    const content = `export default class ${className} {\n  // Your utility code here\n}\n`

    try {
      await fs.mkdir(join(filePath, '..'), { recursive: true })
      await fs.writeFile(filePath, content, 'utf-8')
      
      this.logger.success(`Created: app/utils/${filePath}.ts`)
    } catch (error: any) {
      this.logger.error(`Failed to create utility file: ${error.message}`)
    }
  }
}
