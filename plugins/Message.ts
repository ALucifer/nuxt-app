const MessageDirective = {
  mounted(el: any, binding: any) {
    let observer = new IntersectionObserver(
      (observables) => {
        observables.forEach(function (observable) {
          if (observable.intersectionRatio > 0.99) {
            binding.value.callback(binding.value.message);
            observer.unobserve(observable.target);
          }
        });
      },
      {
        threshold: [1],
      }
    );

    if (binding.value.useCallback) {
      observer.observe(el);
    }
  },
};

export default defineNuxtPlugin((app) => {
  app.vueApp.directive("observe", MessageDirective);
});
