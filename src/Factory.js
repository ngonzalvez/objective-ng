class Factory extends Injectable {
  static $type = 'factory';
  static module = '';

  /**
   * Register the given factory in the corresponding angular module.
   * @method
   *
   * @param {Class} factory   The factory class.
   */
  static register(factory) {
    const injectedFactory = factory.dependencies.slice(0).concat([factory]);

    angular
      .module(factory.module)
      .factory(factory.name, injectedFactory);
  }
}
