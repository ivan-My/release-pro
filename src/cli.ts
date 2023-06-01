import fs from 'fs'
import inquirer from 'inquirer';
import { getVersion, readJSON } from './utils'
import Git from './plugin/Git'
import PluginManager from './plugin/PluginManager';

export default class CLI {
  public git: Git
  pkg: any
  public nextVersion: Object
  plugins: any

  constructor() {
    this.pkg = readJSON(`${process.cwd()}/package.json`)
    this.nextVersion = getVersion(this.pkg.version)
    this.plugins = new PluginManager().plugins
  }
  async run() {
    for (const plugin of this.plugins) {
      plugin['init']()
    }
    const { version } = await this.getVerion()
    for (const plugin of this.plugins) {
      plugin['bump'](version)
    }

  }

  async getVerion() {
    return await inquirer
      .prompt([{
        type: 'list',
        name: 'version',
        message: `请选择要发布的版本，当前版本为:${this.pkg.version}`,
        choices: Object.keys(this.nextVersion).map((item) => {
          return {
            name: `${item}  => ${this.nextVersion[item]}`,
            value: this.nextVersion[item],
          }
        }),
      }])
  }

  runLifeCycleHook(plugin, name) {

  }

  updateVersion(version) {
    const obj = JSON.parse(JSON.stringify(this.pkg))
    obj.version = version
    fs.writeFileSync(
      `${process.cwd()}/package.json`,
      JSON.stringify(obj, null, 2)
    )
  }
}

