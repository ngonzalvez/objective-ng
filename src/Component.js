class Component extends Injectable {
  static $type = 'component';
  static module = '';
  static dependencies = [];

  static register(component) {
    const name = component.name[0].toLowerCase() + component.slice(1);
    const injected = function() {
      const instance = Object.create(component.prototype);
      component.apply(instance, arguments);

      return instance;
    };

    injected.$inject = component.dependencies;
    component.restrict = Directive.Element;
    component.scope = component.bindings;

    angular
      .module(directive.module)
      .directive(name, injected);
  }
}
