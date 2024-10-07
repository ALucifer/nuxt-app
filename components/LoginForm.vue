<template>
  <form
    class="login-form"
    @submit="submit"
  >
    <div class="form-group">
      <label>Email</label>
      <AppInput
        id="email"
        name="email"
        placeholder="Entrez votre email"
        type="email"
        :class="{ 'is-invalid': error }"
      />
    </div>
    <div class="form-group">
      <label>Password</label>
      <AppInput
        id="login-password"
        name="password"
        placeholder="Entrez votre mot de passe"
        type="password"
        :class="{ 'is-invalid': error }"
      />
    </div>
    <div
      v-if="error"
      class="form-group recover"
    >
      <p class="text-danger">
        Login / Mot de passe incorrect
      </p>
    </div>
    <div class="form-group recover">
      <p>
        Mot de passe oublié? <nuxt-link :to="{ name: 'forgot-password' }">
          Retrouvez le
        </nuxt-link>
      </p>
    </div>
    <div class="form-group">
      <button
        v-if="isSubmitting"
        class="cmn-btn submit-btn"
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      </button>
      <button
        v-else
        type="submit"
        class="cmn-btn submit-btn"
      >
        Connexion
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { LoginForm } from '~/app/form/login.form'

const { handleSubmit } = useForm<LoginForm>({ validationSchema: loginFormSchema })

const error = ref(false)
const isSubmitting = ref(false)
const router = useRouter()
const { signIn } = useAuth()
const route = useRoute()

const redirect = route.query.callbackUrl as string ?? router.resolve({ name: 'profile-slug', params: { slug: 'general' } }).href

onMounted(() => {
  if (route.query.error) {
    error.value = true
  }
})

const submit = handleSubmit(async (values: LoginForm) => {
  isSubmitting.value = true
  await signIn(
    'credentials',
    {
      email: values.email,
      password: values.password,
      callbackUrl: redirect,
    },
  )

  isSubmitting.value = false
})
</script>

<style>
.is-invalid {
  border: 1px solid #dc3545 !important;
  padding-right: calc(1.5em + 0.75rem) !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") !important;
  background-repeat: no-repeat !important;
  background-position: right calc(0.375em + 0.1875rem) center !important;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) !important;
}
</style>
