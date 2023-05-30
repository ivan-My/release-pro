
import { execSync } from 'child_process'
import colors from 'colors'
import { readJSON } from './utils'


// 检查工作目录状态
const checkWorkingDirectoryStatus = () => {
  try {
    execSync('git diff-index --quiet HEAD --')
  } catch (error) {
    console.error(colors.red('工作目录有未提交的更改，请先提交或丢弃这些更改'))
    process.exit(-1)
  }
}


const checkStatus = ()=>{
 const s= execSync('git status --short --untracked-files=no').toString()


 if(s){
  console.log(1);

 }else {
  console.log(2);
 }
}

checkStatus()






const { version } = readJSON(`${process.cwd()}/package.json`);
console.log(version);

//checkWorkingDirectoryStatus()

