<template>
  <Datepicker
    v-model="date"
    @update:modelValue="change()"
    :format="format"
    :minDate="minDate"
  ></Datepicker>
  <AppField type="hidden" :name="name" />
  <AppErrorMessage class="error" :name="name" />
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import dayjs from "dayjs";

const props = defineProps(
    {
      name: { type: String, required: true },
      minDate: { type: Date, required: false, default: new Date() },
      format: { type: String, required: false, default: 'yyyy-MM-dd'}
    }
)
const emit = defineEmits(['change'])

const date = ref(null)

function change() {
    let value = null

    if (date.value) {
        value = dayjs(date.value).format('YYYY-MM-DD')
    }

    emit('change', { value })
}
</script>

<style lang="scss">
@import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";

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
