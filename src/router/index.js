import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.private) {
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    if (authUser) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.public) {
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    if (authUser) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
