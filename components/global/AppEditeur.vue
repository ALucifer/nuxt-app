<template>
  <div v-if="editor">
    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      Liste
    </button>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent } from "@tiptap/vue-3";

const editor = ref()

onMounted(() => {
  editor.value = new Editor({
    editorProps: {
      attributes: { class: "test" },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "",
  })
})

onBeforeUnmount(() => editor.value.destroy())
</script>

<style lang="scss">
.test {
  background: var(--body-color);
  border-radius: 10px;
  padding: 15px 25px;
  border: none;
  color: #370898;
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
