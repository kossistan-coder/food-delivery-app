/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)


let state ={
    user:{},
    root:5,
    panier:[],
    burgers:[],
    long:0,
    total:0,
    disabled:{},
    sum:0
}
let store = new Vuex.Store({
state,
    getters:{
        user: state=>{
            return state.user
        },

        root: state =>{
            return state.root
        },
        panier:state =>{
            return state.panier
        },
        long:state=>{
            return state.long
        },
        disabled:state=>{
            return state.disabled
        }
    },
    actions:{
        user(context , user){
            context.commit('user',user)
        },
        root(context,root){
            context.commit('root',root)
        },
        getBurgers(context){
            axios.get('/api/posts').then((response)=>{
                response.data.posts.forEach(element => {
                    element.nombre=0
                });
                context.commit('setBurgers',response.data.posts)
               
            })
            
        },
       
        init_long(context){
            context.commit('init_long')
        },

        disabled(context,key,value){
            context.commit('disabled',
            key,value)
        },
        init_panier(context,product){
            context.commit('panier',product)
        },
        remove_product(context,index){
            context.commit('remove_product',index)
      
        },
        count_long(context){
            context.commit('count_long')
        },
        sum(context){
            context.commit('sum')
        }
    },
    mutations:{
        user(state,user){
            state.user = user
        },
        root(state,root){
            state.root = root
        },
        remove_product(state,index){
            state.panier.splice(index,1)
        },
        panier(state , product){
            state.long ++
            let duplicate = state.panier.findIndex(item=> item.id === product.id)
            if(duplicate !== -1){
                state.panier[duplicate].nombre++
                return;
            }
            product.nombre = 1
            
            state.panier.push(product)
        },
        init_panier(state,product){
            state.panier = product
        },
        init_long(state){
            state.long = 0
        },
        count_long(state){
            let count =0
            state.panier.forEach(element => {
               count += element.nombre 
            });
            state.total = count
           
         
        },
        sum(state){
            let temp=0
            state.panier.forEach(element => {
                temp += (element.nombre * element.price)  
            });
            state.sum=temp
        },
        
        disabled(state,key,value){
            state.disabled[key] = value
        },
        setBurgers(state,product){
            state.burgers = product
          
        }
    }
})

export default store ;