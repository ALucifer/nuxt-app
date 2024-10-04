<template>
  <div class="notifications">
    <TransitionGroup name="fade">
      <template
        v-for="message in messages"
        :key="message.id"
      >
        <div
          v-show="message.visible"
          class="notification"
          :class="message.class"
        >
          <span>{{ replaceLink(message.message) }}</span>
          <button @click="removeMessage(message.id)">
            x
          </button>
        </div>
      </template>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import * as cheerio from 'cheerio'

const { messages, removeMessage } = useFlashMessages()
const router = useRouter()

const replaceLink = (text: string) => {
  const router = useRouter()
  const $ = cheerio.load(text)
  const link = $('[data-url]')

  if (!link) return text

  console.log(
    link
  )

  // const route = router.resolve({
  //   name: 'ViewTournament',
  //   params: { id: link.getAttribute('data-url') }
  // })
  //
  // link.removeAttribute('data-url')
  // link.setAttribute('href', test.href)

  return text
}
</script>

<style lang="scss" scoped>
@use "assets/css/components/global/AppNotifications.scss";
</style>
