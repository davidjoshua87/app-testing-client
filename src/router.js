import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import ChangePassword from './views/ChangePassword'
import Todo from './views/Todo.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/change-password',
    name: 'changePassword',
    component: ChangePassword
  },
  {
    path: '/todo',
    name: 'todo',
    component: Todo
  }
  ]
})
