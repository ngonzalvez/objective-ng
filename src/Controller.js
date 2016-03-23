/**
 * Base class for Angular.js controllers.
 */
class Controller extends Injectable {
  static $type = 'controller';
  static module = '';

  constructor(...args) {
    super(...args);
  }

  /**
   * Register the given controller in the corresponding angular module.
   * @method
   *
   * @param {Class} ctrl    The controller class.
   */
  static register(ctrl) {
    const injectedCtrl = ctrl.dependencies.slice(0).concat([ctrl]);

    angular
      .module(ctrl.module)
      .controller(ctrl.name, injectedCtrl);
  }
}
