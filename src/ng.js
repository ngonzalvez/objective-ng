window.$ng = {
  Directive: Directive,
  Controller: Controller,
  Module: Module,

  register: function(cls) {
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
