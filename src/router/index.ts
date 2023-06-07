import {
  createRouter as createRouterBase,
  createWebHashHistory,
} from 'vue-router'
import type { App } from 'vue'
import type { Pinia } from 'pinia'
import { discard } from '../utils'
import { createRoutes } from './routes'

export function createRouter({ app, store }: { app: App; store: Pinia }) {
  discard({ app })
  const router = createRouterBase({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: createRoutes({ store }),
    history: createWebHashHistory('/'),
  })

  return router
}
