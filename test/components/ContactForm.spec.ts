import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, test, expect } from 'vitest'
import ContactForm from '@/components/ContactForm'

describe('ContactForm', () => {
  test('should render good HTML', async () => {
    const wrapper = await mountSuspended(ContactForm)

    expect(wrapper.html()).toMatchInlineSnapshot(`
          "<form class="contact-form">
            <h5>Laissez votre message</h5>
            <div class="form-group"><label for="name">Pseudo</label><input data-v-3e14a049="" type="text" placeholder="Pseudo">
              <!--v-if-->
            </div>
            <div class="form-group"><label for="email">Email</label><input data-v-3e14a049="" type="email" placeholder="Entrez votre email">
              <!--v-if-->
            </div>
            <div class="form-group"><label for="email">Message</label><textarea data-v-7886c8a5="" id="message" name="message" placeholder="Entrez votre message"></textarea>
              <!--v-if-->
            </div><button class="cmn-btn submit-btn" type="submit">Envoyer</button>
          </form>"
        `)
  })

  test('should indicate name is required')
  test('should indicate email has wrong format')
  test('should indicate message is to short')
  test('should send form and show flash message to say its ok')
  test('should indicate something gone wrong when user send form')
})
