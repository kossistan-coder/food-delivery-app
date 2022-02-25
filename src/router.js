import vue from 'vue'
import VueRouter from 'vue-router'
import Index from './components/Index.vue'



import Register from './components/Register.vue'
import LogInForm from './components/LoginForm.vue'
import Dashboard from './components/Dashboard.vue'
import Settings from './components/Settings.vue'
import Overview from './components/Overview.vue'
import Posts from './components/Posts.vue'
import Panier from './components/Panier.vue'
import Update from './components/Update.vue'
vue.use(VueRouter)

function loggedIn(){
    return localStorage.getItem('token')
}

let routes= [
    {
        path:'/',
        component:Index,
        name:'home'
    },
    {
        path:'/register',
        component:Register,
        name:'register'
    },
    {
        path:'/login',
        component:LogInForm,
        name:'login'
    },
    {
        path:'/dashboard/',
        component:Dashboard,
        name:'dashboard',
        meta: { requiresAuth: true },
        children:[
          {
            path:"overview",
            component:Overview,
            name:'overview'
          },
          {
            path:'settings',
            component:Settings,
            name:'settings'
          },{
            path:'posts',
            component:Posts,
            name:'posts',
            
          },
          {
            path:'posts/update',
            component:Update,
            name:'update'
          }
          
          
        ]
    },
    {
      path:'/panier',
      component:Panier,
      name:'panier'
    },
    
]



let router = new  VueRouter({
    mode:'history',
  
    routes
})

router.beforeEach((to ,from , next) =>{
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!loggedIn() || localStorage.getItem('root') == 0) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else if(to.matched.some(record => record.meta.guest)){
        if (!loggedIn() || localStorage.getItem('root') == 0) {
            next({
              path: '/',
              query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
      }else {
          next()
      }
})

export default router;