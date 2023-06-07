/* eslint-disable @typescript-eslint/no-use-before-define */
import type { App } from 'vue'
import type { Pinia } from 'pinia'
import type VueRouter from 'vue-router'
import { createFetch } from '@vueuse/core'
import type { Fetch } from '../composables/fetch'
import { apiUrl, fetchKey } from '../composables/fetch'
import { useAppStore } from '../stores/app'
import { discard } from '../utils/index'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly fetch: Fetch
  }
}

declare module '@vueuse/core' {
  export interface RequestInit {
    headers: Record<string, unknown>
  }
}

export function bootFetch({ app, store, router }: { app: App; store: Pinia; router: VueRouter }) {
  discard({ router })
  const fetch = createFetch({
    baseUrl: apiUrl,
    options: {
      beforeFetch({ options }) {
        if (appStore.token) {
          options.headers ||= {}
          options.headers.Authorization = `Bearer ${appStore.token}`
        }
      },
    },
  })

  app.provide(fetchKey, fetch)
  store.use(() => ({ fetch }))

  const appStore = useAppStore(store)
}
