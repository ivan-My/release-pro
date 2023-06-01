import Plugin from "./Plugin";
import Npm from './Npm'
import Git from './Git'

const plugins = {
  git: new Git(),
  npm: new Npm()
};

class PluginManager {
  plugins: any
  constructor() {
    this.plugins = [new Npm(), new Git()];
  }

  register(plugin) {
    if (!(plugin instanceof Plugin)) {
      throw new Error('Invalid plugin');
    }
    this.plugins.push(plugin);
  }

  loader() {

  }
  init() {
    this.plugins.forEach(plugin => plugin.init());
  }
}



export default PluginManager
