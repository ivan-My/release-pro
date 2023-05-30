import { execSync } from 'child_process'
import colors from 'colors'
import _ from 'lodash'
import Config from './Config'

const options = {
  requireBranch: "main"
}

class Git extends Config {
  constructor() {
    super()
    this.init()
  }

  init() {
    if (!this.isRequiredBranch()) {
      console.log(colors.red(`必须在${options.requireBranch}分支上`))
      process.exit(-1)
    }

    if (!this.checkStatus()) {
      console.log(colors.red('工作目录有未提交的更改，请先提交或丢弃这些更改'))
      process.exit(-1)
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
    const requiredBranchArray = _.castArray(options.requireBranch)
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
    const branchName = this.getBranchName()
    const ref = execSync('git symbolic-ref HEAD').toString()
    return execSync(`git for-each-ref --format="%(upstream:short)" ${ref}`).toString()
  }

}






export default Git
