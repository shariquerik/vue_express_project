import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import Product from '../views/Product.vue'
import { isLoggedIn } from "../middleware/blockURL"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: isLoggedIn
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: Product
  }
]

const router = new VueRouter({
  routes
})

export default router
