//import { exec } from './utils'
import { execSync } from 'child_process'
import colors from 'colors'


// 检查工作目录状态
function checkWorkingDirectoryStatus() {
  try {
    execSync('git diff-index --quiet HEAD --')
  } catch (error) {
    console.error( colors.red('工作目录有未提交的更改，请先提交或丢弃这些更改'))
    process.exit(-1)
  }
}


checkWorkingDirectoryStatus()

