/**
 * Hack in support for Function.name for browsers that don't support it.
 * IE, I'm looking at you.
**/
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            var funcNameRegex = /function\s([^(]{1,})\(/;
            var results = (funcNameRegex).exec((this).toString());
            return (results && results.length > 1) ? results[1].trim() : "";
        },
        set: function(value) {}
    });
}


window.$ng = {
  Directive: Directive,
  Controller: Controller,
  Module: Module,
  Service: Service,
  Factory: Factory,

  /**
   * Register the given class in its corresponding module.
   * @method
   *
   * @param {Class} cls   An instance of injectable.
   */
  register: function(cls) {
    const type = cls.$type;
    const noModule = !cls.module || !cls.module.trim();

    // If this is not a Module class and has no module defined,
    // raise an error.
    if (type !== 'module' && noModule) {
      const name = cls.name;

      throw new Error(`Module not defined for ${type} "${name}"`);
    }

    cls.register(cls);
  },

  /**
   * Traverses the DOM and counts the number of watchers.
   */
  wcount: function () {
    const root = angular.element(document.getElementsByTagName('body'));
    const watchers = [];
    const watchersWithoutDuplicates = [];

    const f = function (element) {
      angular.forEach(['$scope', '$isolateScope'], scopeProperty => {
        if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
          // Append all the element watchers to the watchers array.
          angular.forEach(element.data()[scopeProperty].$$watchers, watcher => watchers.push(watcher));
        }
      });

      // Process the children elements.
      angular.forEach(element.children(), childElement => f(angular.element(childElement)));
    };

    f(root);

    // Remove duplicate watchers.
    angular.forEach(watchers, item => {
      // Only add watchers that are not already present in the array.
      if (watchersWithoutDuplicates.indexOf(item) < 0) {
        watchersWithoutDuplicates.push(item);
      }
    });

    console.log('Watchers count:', watchersWithoutDuplicates.length);
  }
};
