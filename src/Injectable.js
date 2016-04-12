class Injectable {
  static $deps = {};
  static dependencies = [];

  /**
   * Inject the injectable dependencies into the new instance and call the
   * initialization method.
   * @constructor
   */
  constructor() {
    this.registerDependencies.apply(this, arguments);

    // Pass the injector to the init function.
    this.init(this.inject.bind(this));
  }

  init() {
    // To be implemented in sub-class.
  }

  registerDependencies() {
    this.constructor.dependencies.forEach((name, i) => {
      this.constructor.$deps[name] = arguments[i];
    });
  }

  /**
   * Dependency injector helper function.
   */
  inject(depName) {
    const dependency = this.constructor.$deps[depName];

    if (dependency === null || dependency === undefined) {
      const clsName = this.constructor.name;
      const type = this.constructor.$type;
      const errorMsg =
        `"${clsName}" got undefined when trying to inject ` +
        `"${depName}". Please make sure that it is declared in the ` +
        `${type} dependencies.`
      ;

      throw new Error(errorMsg);
    }

    return dependency;
  }
}
