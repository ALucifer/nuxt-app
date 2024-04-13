<template>
  <client-only>
    <VueDatePicker
      v-model="date"
      @update:model-value="change"
      :format="format"
      :min-date="minDate"
    >
      <template #dp-input="{}">
        <input type="text" :value="value" :placeholder="placeholder ?? name" />
      </template>
    </VueDatePicker>
    <AppField type="hidden" :name="name" />
    <AppErrorMessage class="error" :name="name" />
  </client-only>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";

const props = defineProps({
  name: { type: String, required: true },
  minDate: { type: Date, required: false, default: new Date() },
  format: { type: String, required: false, default: "yyyy-MM-dd HH:mm:ss" },
  value: { type: String, required: false },
  placeholder: { type: String, required: false },
});
const emit = defineEmits(["change"]);

const name = computed(() => props.name);
const { value } = useField(name);
const date = ref(null);

function change(value) {
  date.value = value;
  let formDate = null;

  if (date.value) {
    formDate = dayjs(date.value).format("YYYY-DD-MM HH:mm:ss");
  }

  emit("change", { value: formDate });
}
</script>

<style lang="scss">
.dp__input {
  padding: 15px 40px;
}

.dp__theme_light {
  --dp-background-color: #370898;
  --dp-text-color: #fff;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #370898;
  --dp-menu-border-color: #0e063d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #0e063d;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
}
</style>
