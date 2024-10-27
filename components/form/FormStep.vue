<template>
  <form @submit="onSubmit">
    <slot
      :set-field-value="setFieldValue"
      :values="values"
    />
    <slot
      :meta="meta"
      name="buttons"
    />
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ZodEffects } from 'zod'

const props = defineProps({
  schema: { type: ZodEffects, required: true },
})
const emits = defineEmits(['submit'])

const { handleSubmit, meta, setFieldValue, values } = useForm({ validationSchema: toTypedSchema(props.schema) })

const onSubmit = handleSubmit(values => emits('submit', values))
</script>
