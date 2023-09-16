<template>
  <div>
    <button onclick="editor.chain().focus().toggleBold().run()">
      Bold
    </button>
    <editor-content :editor="editor"/>
  </div>

</template>

<script setup lang="ts">
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import {EditorContent, useEditor} from "@tiptap/vue-3";

const editor = useEditor({
  editorProps: {
    attributes: {class: 'test'}
  },
  extensions: [
    Document,
    Paragraph,
    Text,
    BulletList,
    OrderedList,
    ListItem,
  ],
})
</script>

<style lang="scss">
.test {
  background: #370898;
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
