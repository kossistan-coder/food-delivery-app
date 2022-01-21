/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let state ={
    user:{},
    root:5,
    panier:[],
    long:0,
    disabled:{}
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
        panier(context, product){
            context.commit('panier',product)
        },
        long(context,p_long){
            context.commit('long',p_long)
        },

        disabled(context,key,value){
            context.commit('disabled',
            key,value)
        }
    },
    mutations:{
        user(state,user){
            state.user = user
        },
        root(state,root){
            state.root = root
        },
        panier(state , product){
            state.panier.push(product)
        },
        long(state,p_long){
            state.long = p_long
        },
        disabled(state,key,value){
            state.disabled[key] = value
        }
    }
})

export default store ;