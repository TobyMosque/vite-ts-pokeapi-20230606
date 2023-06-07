import type { Pinia } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { discard } from '../utils'

export function createRoutes({ store }: { store: Pinia }) {
  discard({ store })
  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/IndexPage.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('../pages/ErrorNotFound.vue'),
    },
  ]
  return routes
}
