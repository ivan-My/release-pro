import shll from 'shelljs';
import colors from 'colors'
import { readJSON } from './utils';
import config from './release-pro-config'

class Config {
  config: any
  constructor() {
    const localConfig = readJSON(`${process.cwd()}/release-pro.json`)
    this.config = { ...config, ...localConfig }
  }
  exec(command) {
    return new Promise((resolve, reject) => {
      const childProcess = shll.exec(command, { async: true }, (code, stdout, stderr) => {
        stdout = stdout.toString().trimEnd();
        console.log(3333)
        console.log(stdout);
        if (code === 0) {

          resolve(stdout);
        } else {
          reject(new Error(stderr || stdout));
        }
      });
      childProcess.stdout.on('data', stdout => console.log((colors.red(stdout.toString().trimEnd()))))
      childProcess.stderr.on('data', stderr => console.log((colors.red(stderr.toString().trimEnd()))))
    });
  }
}

export default Config
