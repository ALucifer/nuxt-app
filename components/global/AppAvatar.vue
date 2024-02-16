<template>
  <div v-if="editable">
    <label class="avatar-edit">
      <AppImage
        :src="src"
        v-bind="$attrs"
        class="avatar-img"
      />
      <div class="avatar-upload-overlay">
        <download-icon />
      </div>
      <input
        v-show="false"
        type="file"
        id="avatar"
        accept="image/*"
        @change="handleAvatarUpload"
      />
    </label>
  </div>
  <AppImage
    :src="src"
    :class="[$attrs.class ? $attrs.class : 'avatar-img']"
    v-else
  />
</template>

<script setup lang="ts">
interface Avatar {
  src: string|null,
  editable?: boolean
}
withDefaults(
    defineProps<Avatar>(),
    {
      editable: false,
    }
)

const emit = defineEmits(['change'])
function handleAvatarUpload(event: Event) {
  emit("change", event);
}
</script>
<style>
img {
  object-fit: cover;
}

.avatar-edit {
  position: relative;
  cursor: pointer;
}

.avatar-edit:hover {
  opacity: 0.9;
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
