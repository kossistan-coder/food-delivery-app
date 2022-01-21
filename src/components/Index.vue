<template>
    <div>
       <sui-menu fixed borderless>
            <sui-menu-item >
                <div class="ui tiny header">
                    <img src="../assets/Burger.png" alt="">
                    <div class="content">
                        BurgerHouse
                    </div>
                </div>
            </sui-menu-item>
         
            

            <sui-menu-menu position="right">
                
                
                <sui-dropdown item icon="user" v-show="this.$store.getters.root == 0">
                   
                    <sui-dropdown-menu>
                        <sui-dropdown-item><router-link :to="{name:'register'}" class="text-black">Register</router-link></sui-dropdown-item>
                        <sui-dropdown-item><router-link :to="{name:'login'}" class="text-black">Log In</router-link></sui-dropdown-item>
                        <sui-dropdown-item ><a href="javascript:void(0)" @click="logout">Log out</a></sui-dropdown-item>
                    </sui-dropdown-menu>
                </sui-dropdown>
                <router-link :to="{name:'panier'}" is="sui-menu-item" v-show="this.$store.getters.root == 0">
                    <sui-icon name="shopping cart" /> 
                    <sui-label style="background-color: #4730db;" relative>
                        {{this.$store.getters.long}}
                    </sui-label>
                </router-link>
                <sui-menu-item right>
                <sui-input transparent icon="search" placeholder="Search..." />
                </sui-menu-item>
            </sui-menu-menu>
        </sui-menu>
        
        <div style="margin-top:90px; " class="flex-center">
           
            <p class="main-title" >BurgerHouse to satisfy your <span class="text-blue">sweet tooth</span></p>
            
        </div>
        <div class="flex-center">
            <p class="text-center" style="font-size:1.5em;">
                Order , buy hot burger and food and have it deliver at a record time .
            </p>
        </div>
        <div class="flex-center">
            <p class="text-center" style="font-size:1.5em;">
                Register is free , and it allows you to use our platform features
            </p>
        </div>
        <div class="flex-center">
            <p class="text-center" style="font-size:1.5em;">
                Before pay something , you need to be log in .
            </p>
        </div>
        <br>
        <div class="flex-center">
            <div class="inline">
                <router-link :to="{name:'register'}" class="ui big  button box-blue">
                    Get Started
                </router-link>
                <router-link :to="{name:'login'}" class="ui big  button black">
                    Log In
                </router-link>
            </div>
        </div>
        <div class="ui container" style="margin-top:80px">
            <sui-divider section />
        </div>
        <div class="ui container" >
            <div style="display: grid;grid-template-columns:1fr 1fr 1fr;column-gap:40px;">
                <div v-for="burger in burgers" :key="burger.name" style="padding-top: 20px;">
                    <BurgerCard :nom="burger.name" :image="burger.image" :price="burger.price" :time="burger.delivery_time" :description="burger.description" :root="root" :id="burger.id" ></BurgerCard>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import BurgerCard from './BurgerCard.vue'
    export default{
        data() {
            return {
                burgers:{},
                p_long:0,
                root:5
            }
        },
        mounted() {
            if (localStorage.getItem('root')) {
                this.root = localStorage.getItem('root')
            }
            document.querySelector('body').style.backgroundColor='white'
            let response =  axios.get('api/users')
            this.$store.dispatch('user',response.data)
           

            axios.get('/api/posts').then((response)=>{
                this.burgers = response.data.posts
                
            })
        },
        methods: {
            logout(){
                // eslint-disable-next-line no-unused-vars
                axios.post('api/logout')
                this.root = 5
                    localStorage.removeItem('root')
                    localStorage.removeItem('user')
                     localStorage.removeItem('token')
                     this.$store.dispatch('user',{})
                     this.$store.dispatch('root',null)
                     this.$router.push({name:'login'})
                     this.$router.push({name:'home'})
                     
            }
        },
        computed:{
            ...mapGetters(['user','root'])
        },
        components:{
            BurgerCard
        }
    }
</script>
<style>
    .text-black{
        color: black;
    }
    .flex-center{
        display: flex;
        justify-content: center;
    }
    .main-title{
        font-size:3em;
        font-weight: bold;
    }
    .text-center{
        text-align: center;
    }
    .text-blue{
        color: #4730db;
    }
    .ui.button.big.box-blue{
        background-color: #4730db;
        color: #ffffffff;

    }
    
</style>