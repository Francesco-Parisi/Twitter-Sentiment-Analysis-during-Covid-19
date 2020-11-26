import Vue from 'vue'
import VueRouter from 'vue-router'
import General from '../views/index.vue'
import Week1 from '../views/week1.vue'

Vue.use(VueRouter)

const routes= [
    {
        path:'/',
        name:'General',
        component:General
    },
    {
        path:'/week1',
        name:'Week1',
        component:Week1
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router