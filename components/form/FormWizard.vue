<template>
  <form @submit="onSubmit">
    <slot :set-field-value="setFieldValue" :values="values" />

    <div class="button-end">
      <button v-if="!isLastStep" :disabled="!meta.valid" class="cmn-btn" type="submit">Suivant</button>
      <template v-else>
        <button v-if="isSubmitLastStep" class="cmn-btn submit-btn">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        </button>
        <button v-else :disabled="!meta.valid" class="cmn-btn" type="submit">
          Envoyer
        </button>
      </template>
      <NuxtLink v-if="currentStepIdx === 0" class="btn btn--cancel">Annuler</NuxtLink>
      <button v-if="hasPrevious" class="btn btn--previous" type="button" @click="goToPrev">Précédent</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { ref, computed, provide } from 'vue';

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
  isSubmitLastStep: {
    type: Boolean,
    required: false,
    default: false
  }
});

const emit = defineEmits(['submit', 'changeStep']);

const currentStepIdx = ref(0);
const stepCounter = ref(0);

watch(currentStepIdx, () => {
  emit('changeStep', currentStepIdx)
})

provide('STEP_COUNTER', stepCounter);
provide('CURRENT_STEP_INDEX', currentStepIdx);

const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1;
});

const hasPrevious = computed(() => {
  return currentStepIdx.value > 0;
});

const currentSchema = computed(() => {
  return props.validationSchema[currentStepIdx.value];
});

const { values, handleSubmit, setFieldValue, meta } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit((values) => {
  if (!isLastStep.value) {
    currentStepIdx.value++;

    return;
  }

  emit('submit', values);
});

function goToPrev() {
  if (currentStepIdx.value === 0) {
    return;
  }


  currentStepIdx.value--;
}
</script>
