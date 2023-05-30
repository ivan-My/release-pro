
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


const checkStatus = () => {
  try {
    execSync('git diff-index --quiet HEAD --');
    return true;
  } catch (error) {
    return false;
  }
};
checkStatus()

if(!checkStatus()) {
  console.error(colors.red('工作目录有未提交的更改，请先提交或丢弃这些更改'))
}else {
  console.log('全部提交了');

}






const { version } = readJSON(`${process.cwd()}/package.json`);
console.log(version);

//checkWorkingDirectoryStatus()

