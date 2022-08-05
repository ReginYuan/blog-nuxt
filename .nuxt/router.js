import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _62ad64ca = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _64a32f90 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _2ffb0ad8 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _12eaf550 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _6c063654 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _7a4b1844 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _45566eb6 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _62ad64ca,
    children: [{
      path: "",
      component: _64a32f90,
      name: "home"
    }, {
      path: "login",
      component: _2ffb0ad8,
      name: "login"
    }, {
      path: "register",
      component: _2ffb0ad8,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _12eaf550,
      name: "profile"
    }, {
      path: "/settings",
      component: _6c063654,
      name: "settings"
    }, {
      path: "/editor",
      component: _7a4b1844,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _45566eb6,
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
