class Directive extends Injectable {
  static $type = 'directive';
  static module = '';
  static dependencies = [];
  static tagName = '';
  static Element = 'E';
  static Attribute = 'A';


  static register(directive) {
    const injected = directive.dependencies.slice(0);

    injected.push(function() {
      const instance = Object.create(directive.prototype);
      directive.apply(instance, arguments);

      return instance;
    });

    angular
      .module(directive.module)
      .directive(directive.tagName, injected);
  }
}
