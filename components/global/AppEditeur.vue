<template>
  <div>
    <floating-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        Bullet List
      </button>
    </floating-menu>
    <editor-content :editor="editor" class="test"/>
  </div>

</template>

<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import {EditorContent, useEditor, FloatingMenu} from "@tiptap/vue-3";

const editor = useEditor({
  extensions: [
      StarterKit,
  ],
})
</script>

<style lang="scss">
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }
}
.test {
  background: #370898;
}

.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }
}
</style>
