<template>
  <p v-if="editable">
    <label class="avatar-edit" for="avatar">
      <img
        :src="src || '/user-placeholder.png'"
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
  </p>
  <img
    :src="src || '/user-placeholder.png'"
    :class="[$attrs.class ? $attrs.class : 'avatar-img']"
    v-else
  />
</template>

<script>
export default {
  props: {
    src: { type: String },
    editable: { type: Boolean, default: false },
  },
  emits: ["change"],
  methods: {
    handleAvatarUpload(event) {
      this.$emit("change", event);
    },
  },
};
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
