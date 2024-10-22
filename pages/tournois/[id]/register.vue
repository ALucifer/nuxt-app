<template>
  <div class="container">
    <div class="col-6 mx-auto mt-3">
      <div class="card__format card__format--light">
        <div class="rows m-5">
          <form @submit="submit">
            <AppImage
              class="card__avatar"
              :src="'data:image/svg+xml;base64,' + avatar"
              @click.prevent="generateAvatar()"
            />
            <div class="form-group my-5">
              <AppInput
                name="libelle"
                type="text"
                placeholder="Nom de votre équipe"
              />
            </div>
            <button
              class="cmn-btn"
              type="submit"
            >
              <template v-if="handleLoading">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </template>
              <template v-else>
                Participer
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { minidenticon } from 'minidenticons'
import { definePageMeta } from '#imports'
import type { RegisterForm } from '~/app/form/register.form'
import type { StatusCode } from '~/types/api'
import type { CssClassFlashMessage } from '~/types/notifications'

useSeoMeta({
  title: 'Inscription au tournoi',
  description: 'Page d\'inscription à un tournoi.',
})

definePageMeta({
  middleware: ['register'],
})

const { addMessage } = useFlashMessages()
const { handleSubmit } = useForm<RegisterForm>({ validationSchema: registerFormSchema })
const route = useRoute()
const router = useRouter()

const avatar = ref()
const handleLoading = ref(false)

function generateAvatar() {
  let result = ''
  const characters
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < 15; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    )
  }
  avatar.value = btoa(minidenticon(result))
}

const submit = handleSubmit(
  async (values: RegisterForm) => {
    try {
      handleLoading.value = true
      await $fetch<StatusCode>(
        '/api/tournaments/register',
        {
          method: 'POST',
          body: {
            ...values,
            avatar: avatar.value,
            tournament_id: +route.params.id,
          },
        },
      )

      addMessage({
        class: 'success' as CssClassFlashMessage,
        message: 'Vous êtes bien inscrit sous l\'équipe <b>' + values.libelle + '</b>',
      })
    }
    catch (e) {
      addMessage({
        class: 'error' as CssClassFlashMessage,
        message: e.response._data.message,
      })
      handleLoading.value = false

      return
    }

    router.push({
      name: 'tournois-id',
      params: { id: route.params.id },
    })
  },
)

onMounted(() => generateAvatar())
</script>

<style lang="scss">
@import "@/assets/css/components/tournament/card.scss";
</style>
