import fs from 'fs'
import inquirer from 'inquirer';
import colors from 'colors'
import { getVersion, readJSON } from './utils'
import Git from './Git'


export default class CLI {
  public git: Git
  pkg: any
  public nextVersion: Object
  constructor() {
    this.git = new Git()
    this.pkg = readJSON(`${process.cwd()}/package.json`)
    this.nextVersion = getVersion(this.pkg.version)
  }
  run() {
    this.git.prepare()
    inquirer
      .prompt([{
        type: 'list',
        name: 'name',
        message: `请选择要发布的版本，当前版本为:${this.pkg.version}`,
        choices: Object.keys(this.nextVersion).map((item) => {
          return {
            name: `${item}  => ${this.nextVersion[item]}`,
            value: this.nextVersion[item],
          }
        }),
      },])
      .then((answers) => {
        console.log('即将要升级的版本为', colors.green(answers.name));
        this.updateVersion(answers.name)
        this.git.commit(answers.name)
        this.git.tag()
        this.git.push()
      })
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

