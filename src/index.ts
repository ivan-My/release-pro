import { readJSON } from './utils'
import Git from './Git'

new Git()




const { version } = readJSON(`${process.cwd()}/package.json`);
console.log(version);

//checkWorkingDirectoryStatus()

