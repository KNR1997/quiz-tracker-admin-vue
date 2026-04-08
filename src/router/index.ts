import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'
import { setupRouterGuard } from './guard'

const isHash = import.meta.env.VITE_USE_HASH === 'true'
export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app: any) {
  setupRouterGuard(router)
  app.use(router)
}

export async function resetRouter() {
  const basicRouteNames = getRouteNames(basicRoutes)
  router.getRoutes().forEach((route) => {
    const name = route.name
    if (!basicRouteNames.includes(name)) {
      // @ts-ignore
      router.removeRoute(name)
    }
  })
}

export function getRouteNames(routes: any) {
  return routes.map((route: any) => getRouteName(route)).flat(1)
}

function getRouteName(route: any) {
  const names = [route.name]
  if (route.children && route.children.length) {
    names.push(...route.children.map((item: any) => getRouteName(item)).flat(1))
  }
  return names
}
