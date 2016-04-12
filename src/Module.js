/**
 *  Base class for angular modules.
 */
class Module {
  static dependencies = [];
  static configDependencies = [];
  static runDependencies = [];
  static moduleName = '';
  static $type = 'module';

  /**
   * Module configuration method.
   */
  static config() { /* Implement in subclass. */ }

  /**
   * Module initializer method.
   */
  static run() { /* Implement in subclass. */ }

  /**
   * Register this module instance in the angular module registry.
   */
  static register(module) {
    const injectedConfig = module.configDependencies.slice(0);
    const injectedRun = module.runDependencies.slice(0);

    injectedConfig.push(module.config);
    injectedRun.push(module.run);

    angular
      .module(module.moduleName, module.dependencies)
      .config(injectedConfig)
      .run(injectedRun);
  }
}
