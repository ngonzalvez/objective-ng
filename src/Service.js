class Service extends Injectable {
  static $type = 'service';
  static module = '';

  /**
   * Register the given service in the corresponding angular module.
   * @method
   *
   * @param {Class} service   The service class.
   */
  static register(service) {
    const injectedService = service.dependencies.slice(0).concat([service]);

    angular
      .module(service.module)
      .service(service.name, injectedService);
  }
}
