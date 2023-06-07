import type { createFetch } from '@vueuse/core'
import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export const apiUrl = 'https://pokeapi.co/api/v2'
export type Fetch = ReturnType<typeof createFetch>
export const fetchKey: InjectionKey<Fetch> = Symbol('fetch-api')

export function useFetch() {
  const fetch = inject(fetchKey)
  if (!fetch)
    // eslint-disable-next-line no-throw-literal
    throw 'fetch isn`t injected'

  return fetch
}
