import { execSync } from 'child_process'
import colors from 'colors'
import _ from 'lodash'
import Plugin from './Plugin'


class Git extends Plugin {
  public options: any
  version: string

  constructor() {
    super()
    this.options = this.config.git
    this.version = ''
  }
  init() {
    console.log('---npm---')
    this.prepare()
  }

  prepare() {
    if (this.options.requireBranch && !this.isRequiredBranch()) {
      console.log(colors.red(`必须在${this.options.requireBranch}分支上`))
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
    try {
      execSync(`git commit -m '${msg}'`)
    } catch (error) {
      console.error('Error occurred while retrieving tags:', error);
    }
  }

  getAllTags() {
    const tags = execSync('git tag --list').toString().trim().split('\n');
    return tags;
  }

  tag() {
    const currentTag = `v${this.version}`
    // 判断tag是否已经存在
    if (this.getAllTags().includes(currentTag)) {
      this.reset()
      console.log(colors.red(`Tag ${currentTag} 已经存在`))
      process.exit(-1)
    }
    execSync(`git tag v${this.version}`)
  }

  push() {
    execSync('git push')
    execSync(`git push origin v${this.version}`)
  }

  reset() {
    const commitHash = this.getLatestCommitHash()
    try {
      execSync(`git revert --no-commit ${commitHash}`, { stdio: 'inherit' });
      execSync('git reset', { stdio: 'inherit' });
    } catch (error) {
    }
  }

  // 获取最近一次commit hash
  getLatestCommitHash() {
    try {
      const hash = execSync('git rev-parse HEAD').toString().trim();
      return hash;
    } catch (error) {
      return null;
    }
  }
}


export default Git
