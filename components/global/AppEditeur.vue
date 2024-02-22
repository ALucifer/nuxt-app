<template>
  <div v-if="editor">
    <bubble-menu
        class="bubble-menu"
        :tippy-options="{ hideOnClick: 'toggle', appendTo: 'parent' }"
        :editor="editor"
    >
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        Titre
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        Sous-titre
      </button>
      <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        Gras
      </button>
      <button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        List
      </button>
    </bubble-menu>
  </div>

  <editor-content :editor="editor" />
  <p class="nb">* pensez à surligner pour utiliser le menu</p>
</template>

<script lang="ts" setup>
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  placeholder: { type: String, default: 'Votre texte' },
  name: { type: String, required: true }
})

const name = computed(() => props.name)
const { setValue } = useField(name)

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder,considerAnyAsEmpty: true
    }),
  ],
  onUpdate: ({ editor }) => {
    setValue(editor.getHTML())
  }
})

// watch(editor.value!.getHTML()!, (newvalue) => {console.log(newvalue)})
</script>

<style lang="scss">
.tiptap {
  padding: 16px;
  background-color: #370898;
  border-radius: 10px;

  > * + * {
    margin-top: 0.75em;
    color: white;
  }

  ul,
  ol {
    padding-left: 16px;
    margin: unset;
    list-style: unset;
  }

  p,
  span,
  li {
    margin: unset;
    font-family: unset;
    font-weight: unset;
    font-size: unset;
    line-height: unset;
  }
}

.is-active {
  background-color: #00acf6;
}

.bubble-menu > button {
  margin: 0 2px!important;
  border-radius: 4px;
}

.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
.nb {
  font-size: 10px;
}
</style>