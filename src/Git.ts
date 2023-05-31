import { execSync } from 'child_process'
import colors from 'colors'
import _ from 'lodash'
import Config from './Config'
import { GitType } from './utils/types'



class Git extends Config {
  public options: any
  version: string

  constructor() {
    super()
    this.options = this.config.git
    this.version = ''
  }
  init() {
    this.prepare()
  }

  prepare() {
    if (this.options.requireBranch && !this.isRequiredBranch()) {
      console.log(colors.red(`必须在${this.options.requireBranch}分支上`))
      process.exit(-1)
    }

    if (!this.checkStatus()) {
      console.log(colors.red('工作目录有未提交的更改，请先提交或丢弃这些更改'))
      //  process.exit(-1)
    }

    if (!this.hasUpstream()) {
      console.log(colors.red('没有为当前分支配置上游地址'))
      process.exit(-1)
    }
  }

  getBranchName = () => {
    return execSync('git rev-parse --abbrev-ref HEAD').toString();
  }

  isRequiredBranch = () => {
    const name = this.getBranchName()
    const requiredBranchArray = _.castArray(this.options.requireBranch)
    return requiredBranchArray.includes(name.trim())
  }

  checkStatus = () => {
    try {
      execSync('git diff-index --quiet HEAD --');
      return true
    } catch (error) {
      return false
    }
  }

  hasUpstream = () => {
    const ref = execSync('git symbolic-ref HEAD').toString()
    return execSync(`git for-each-ref --format="%(upstream:short)" ${ref}`).toString().trim()
  }


  commit(version) {
    this.version = version
    execSync('git add .')
    const msg = this.options.commitMessage.replace(/v\${version}/, version)
    execSync(`git commit -m '${msg}'`)
  }


  getAllTags() {
    const tags = execSync('git tag --list').toString().trim().split('\n');
    return tags;
  }

  tag() {
    const currentTag = `v${this.version}`
    // 判断tag是否已经存在
    if (this.getAllTags().includes(currentTag)) {
      console.log(colors.red(`Tag ${currentTag} 已经存在`))
    }

    // execSync(`git tag v${this.version}`)
    // execSync(`git tag v1.0.1`)
  }

}





export default Git
