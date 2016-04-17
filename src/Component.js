class Component extends Injectable {
  static $type = 'component';
  static module = '';
  static dependencies = [];

  static register(component) {
    const name = component.name[0].toLowerCase() + component.name.slice(1);
    const injected = function() {
      const instance = Object.create(component.prototype);
      component.apply(instance, arguments);
      instance.scope = instance.bindings;
      instance.restrict = Directive.Element;

      return instance;
    };

    injected.$inject = component.dependencies;

    angular
      .module(component.module)
      .directive(name, injected);
  }
}
