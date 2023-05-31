import Plugin from "./Plugin";
import Npm from './Npm'
import Git from './Git'




class PluginManager {
  plugins: any
  constructor() {
    this.plugins = [Npm, Git];
  }


  register(plugin) {
    if (!(plugin instanceof Plugin)) {
      throw new Error('Invalid plugin');
    }
    this.plugins.push(plugin);
  }

  init() {
    this.plugins.forEach(plugin => plugin.init());
  }
}



export default PluginManager
