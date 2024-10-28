<template>
  <div class="button-end">
    <button
      v-if="!isLastStep"
      :disabled="!valid"
      class="cmn-btn"
      type="submit"
    >
      Suivant
    </button>
    <template v-else>
      <button
        v-if="isSubmitLastStep"
        class="cmn-btn submit-btn"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      </button>
      <button
        v-else
        :disabled="!valid"
        class="cmn-btn"
        type="submit"
      >
        Envoyer
      </button>
    </template>
    <button
      class="btn btn--previous"
      type="button"
      @click="goToPrev"
    >
      Précédent
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  valid: Boolean,
  isLastStep: Boolean,
  isSubmitLastStep: Boolean,
})

const emits = defineEmits<{
  prev: [data: null]
}>()

const goToPrev = () => {
  emits('prev', null)
}
</script>
