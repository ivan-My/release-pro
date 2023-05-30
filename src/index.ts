import { exec } from './utils'

// 检查工作目录状态
function checkWorkingDirectoryStatus() {
  try {
    // 执行 Git 命令检查工作目录状态
   // exec('git diff-index --quiet HEAD --')
    // 工作目录干净，没有未提交的更改
    console.log('工作目录是干净的，没有未提交的更改。')
  } catch (error) {
    // 工作目录有未提交的更改
    console.error('工作目录有未提交的更改，请先提交或丢弃这些更改。')
    process.exit(-1)
  }
}


checkWorkingDirectoryStatus()

