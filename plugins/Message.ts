import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('observe', {
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
  })
})
