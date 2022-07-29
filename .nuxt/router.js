import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d540e48e = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _54f241a4 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _48e5620c = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _069c48fa = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _5e2ce6f2 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _ecde9808 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _2532e772 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _d540e48e,
    children: [{
      path: "",
      component: _54f241a4,
      name: "home"
    }, {
      path: "login",
      component: _48e5620c,
      name: "login"
    }, {
      path: "register",
      component: _48e5620c,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _069c48fa,
      name: "profile"
    }, {
      path: "/settings",
      component: _5e2ce6f2,
      name: "settings"
    }, {
      path: "/editor",
      component: _ecde9808,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _2532e772,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
