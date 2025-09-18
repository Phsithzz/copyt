import { createRouter,createWebHistory } from "vue-router"
import TheProduct from "../TheProduct.vue"
import TheLogin from "../TheLogin.vue"
import TheHome from "../TheHome.vue"
import TheRegister from "../TheRegister.vue"
import PageMember from "../PageMember.vue"

const routes = [
    {
        path:'/',
        name:'home',
        component:TheHome
    },
    {
        path:'/product',
        name:'product',
        component:TheProduct
    },
    {
        path:'/login',
        name:'Login',
        component:TheLogin
    },
    {
        path:'/register',
        name:'Register',
        component:TheRegister
    },
    {
        path:'/pagemember',
        name:'PageMember',
        component:PageMember
    }
]
const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),routes
})
export default router