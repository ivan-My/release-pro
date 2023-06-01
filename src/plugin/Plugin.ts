
import { readJSON } from '../utils/index';
import config from '../release-pro-config'

class Plugin {
  config: any
  constructor() {
    const localConfig = readJSON(`${process.cwd()}/release-pro.json`)
    this.config = { ...config, ...localConfig }
  }
  init() {

  }
  bump(version) {

  }
}

export default Plugin
