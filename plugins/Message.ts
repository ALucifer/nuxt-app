import type { DirectiveBinding } from 'vue'

const MessageDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(
      (observables) => {
        observables.forEach(function (observable) {
          if (observable.intersectionRatio > 0.99) {
            binding.value.callback(binding.value.message)
            observer.unobserve(observable.target)
          }
        })
      },
      {
        threshold: [1],
      },
    )

    if (binding.value.useCallback) {
      observer.observe(el)
    }
  },
}

export default defineNuxtPlugin((app) => {
  app.vueApp.directive('observe', MessageDirective)
})
