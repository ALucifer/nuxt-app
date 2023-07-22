<template>
  <div>
    <div v-if="editable">
      <div class="avatar-edit">
        <nuxt-img
          :src="src"
          placeholder="/user-placeholder.png"
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
      </div>
    </div>
    <nuxt-img
        :src="src"
        placeholder="/user-placeholder.png"
        :class="[$attrs.class ? $attrs.class : 'avatar-img']"
        v-else
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: { type: String },
  editable: { type: Boolean, default: false },
})

const emit = defineEmits(['change'])
function handleAvatarUpload(event) {
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
