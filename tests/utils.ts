import type { mountSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent } from '@testing-library/vue'
import { flushPromises } from '@vue/test-utils'

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function login(wrapper: ReturnType<typeof mountSuspended>) {
  await navigateTo('/login')
  await flushPromises()
  // @TODO: if we wait less then tests become flaky. Have to investigate why
  await wait(1000)
  const form = await wrapper.find('form')
  const emailInput = await wrapper.find('input[type="email"]')
  const passwordInput = await wrapper.find('input[type="password"]')

  await emailInput.setValue('email@gmail.com')
  await passwordInput.setValue('world')

  await fireEvent.submit(form.element)
  await wait(100)
}

export async function logout() {
  const userCookie = useCookie('user')
  const tokenCookie = useCookie('token')
  userCookie.value = undefined
  tokenCookie.value = undefined
  await nextTick()
}
