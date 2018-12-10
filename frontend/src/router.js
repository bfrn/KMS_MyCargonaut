import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/SignIn.vue'
import Users from './views/Users.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signin',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    }
  ]
})
