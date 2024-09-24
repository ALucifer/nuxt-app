<template>
  <div v-if="editable">
    <label class="avatar-edit">
      <AppImage
        :src="src"
        :class="[imgClass ? imgClass : 'avatar-img']"
      />
      <div class="avatar-upload-overlay">
        <download-icon />
      </div>
      <input
        v-show="false"
        id="avatar"
        type="file"
        accept="image/*"
        @change="handleAvatarUpload"
      >
    </label>
  </div>
  <AppImage
    v-else
    :src="src"
    :class="[$attrs.class ? $attrs.class : 'avatar-img']"
  />
</template>

<script setup lang="ts">
interface Avatar {
  src: string|null,
  editable?: boolean,
  imgClass?: string|null,
}
withDefaults(
    defineProps<Avatar>(),
    {
      editable: false,
      imgClass: null
    }
)

const emit = defineEmits(['change'])
function handleAvatarUpload(event: Event) {
  emit("change", event);
}
</script>
<style scoped lang="scss">
img {
  object-fit: cover;
}

.avatar-edit {
  position: relative;
  cursor: pointer;
}

.avatar-edit .avatar-upload-overlay {
  display: none;
}
.avatar-edit:hover .avatar-upload-overlay {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
