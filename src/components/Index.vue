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
                <sui-menu-item>About</sui-menu-item>
                <sui-menu-item>Register</sui-menu-item>
                <sui-menu-item>Sign in</sui-menu-item>
                <sui-dropdown item icon="user" v-show="root == 0">
                   
                    <sui-dropdown-menu>
                        <sui-dropdown-item><router-link :to="{name:'register'}" class="text-black">Register</router-link></sui-dropdown-item>
                        <sui-dropdown-item><router-link :to="{name:'login'}" class="text-black">Log In</router-link></sui-dropdown-item>
                        <sui-dropdown-item ><a href="javascript:void(0)" @click="logout">Log out</a></sui-dropdown-item>
                    </sui-dropdown-menu>
                </sui-dropdown>
                <router-link :to="{name:'panier'}" is="sui-menu-item" v-show="this.$store.getters.root == 0">
                    <sui-icon name="shopping cart" /> 
                    <sui-label style="background-color: orange;" relative>
                        {{this.$store.state.total}}
                    </sui-label>
                </router-link>
                <sui-menu-item right>
                <sui-input transparent icon="search" placeholder="Search..." />
                </sui-menu-item>
            </sui-menu-menu>
        </sui-menu>
        
        <div style="margin-top:80px;" class="ui container">
            <div class="grid-2 ">
                <div id="g-1">
                    <div>
                        <p class="main-title" >BurgerHouse to satisfy your <span class="text-orange">sweet tooth</span></p>
                        <p class="sub-title">
                            Order , buy hot burger and food and have it deliver at a record time .
                        Register is free , and it allows you to use our platform features
                        Before pay something , you need to be log in .
                        </p>
                    </div>
                    <br>
                    <div class="inline">
                        <router-link :to="{name:'register'}" class="ui big button orange">
                            Get Started
                        </router-link>
                        <router-link :to="{name:'login'}" class="ui big basic button">Login</router-link>
                    </div>
                    
                </div>
                <div id="g-2">
                    <img src="../assets/home-img-2.png" alt="" >
                </div>
            </div>
        </div>
        
        <div class="back">
            <div class="marge " style="padding-top:40px;text-align:center">
                <sui-header size="huge">
                    <sui-header-subheader style="color:orange">
                             Our main dishes
                        </sui-header-subheader>
                        Popular dishes
                        
                </sui-header>
            </div>
            
        <div class="ui centered grid " >
           
            <div class="grid-3">
                <div v-for="burger in burgers" :key="burger.name" style="padding-top: 20px;">
                    <!--<BurgerCard :nom="burger.name" :image="burger.image" :price="burger.price" :time="burger.delivery_time" :description="burger.description" :root="root" :id="burger" ></BurgerCard>-->
                    <div v-show="burger.category == 0">
                        <div class="ui segment " id="segment">
                            <div>
                                <img :src="'http://localhost:8000'+burger.image" alt="" style="height:200px">
                            </div>
                            <div :style="style">
                                <sui-header size="huge">
                                    {{burger.name}}
                                    <sui-header-subheader>
                                      Delivery time :  {{burger.delivery_time}} min
                                    </sui-header-subheader>
                                </sui-header>
                            </div>
                            <br>
                            <div class="space-2" id="pos">
                                <div>
                                    <div :style="style">
                                        <sui-header size="medium" style="color:orange">$ {{burger.price}}</sui-header>
                                    </div>
                                </div>
                                <div v-show="root == 0">
                                    <div class="ui icon black button " @click="add(burger)">
                                        <i class="shopping cart icon"></i>
                                        Add to cart
                                    </div>
                                </div>
                            </div>
                        </div>
                                
                    </div>
                </div>
                
            </div>
        </div>
        </div>
        <div class="ui centered grid" style="margin-top:40px">
            <sui-header size="huge">
                    <sui-header-subheader style="color:orange">
                             About us
                    </sui-header-subheader>
                        Why choose us
                        
                </sui-header>
        </div>
        <div class="ui container">
            <div class="grid-inq-2">
                <div>
                    <img src="../assets/about-img.png" alt="" class="ui big image">
                </div>
                <div>
                    <sui-header size="huge">
                        Best Food In The Country
                    </sui-header>
                    <p>
                        Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Dolore, Sequi Corrupti Corporis Quaerat Voluptatem Ipsam Neque Labore Modi Autem, Saepe Numquam Quod Reprehenderit Rem? Tempora Aut Soluta Odio Corporis Nihil!

Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Aperiam, Nemo. Sit Porro Illo Eos Cumque Deleniti Iste Alias, Eum Natus.
                    </p>
                    <div>
                       <router-link :to="{name:'register'}" class="ui big button orange">
                            Get Started
                        </router-link> 
                    </div>
                </div>
            </div>
        </div>
        
        <div class="back">
            <div class="ui centered grid" style="padding-top:40px;padding-bottom:20px;">
            <sui-header size="huge">
                    <sui-header-subheader style="color:orange">
                             Our menu
                    </sui-header-subheader>
                        Today's speciality
                        
                </sui-header>
            </div>
            <div class="ui centered grid">
                <div class="grid-3">
                    <div v-for="burger in burgers" :key="burger.id">
                        
                        <div class="ui segment" v-show="burger.category == 1" id = "segment-1">
                            <div class="image">
                                <img :src="'http://localhost:8000'+burger.image" class="ui fluid image" style="height:250px">
                            </div>
                            <br>
                            <div class="content">
                                <div  class="header ">
                                    <a style="font-size:2em;color:black;font-weight:bold">{{burger.name}}</a>
                                </div>
                                <div class="meta">
                                <span class="date">
                                    Delivery time : {{burger.delivery_time}} min
                                </span>
                                </div>
                                <div class="description">
                                    {{burger.description}}
                                </div>
                            </div>
                            <br>
                            <div class="extra content" id="position-1">
                                <div class="ps-2">
                                    <div v-show="root == 0">
                                        <div class="ui black button icon" @click="add(burger)">
                                            <i class="shopping cart icon"></i>
                                             Add to cart
                                        </div>
                                    </div>
                                    <div class="right">
                                       <div class="ui huge orange header">
                                           $ {{burger.price}}
                                       </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

    export default{
        data() {
            return {
             
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
            this.$store.dispatch('root',this.root)
            this.$store.commit('count_long')
           
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
                     this.$store.commit('init_panier',[])
                      this.$store.commit('init_long')
                     this.$router.push({name:'home'})
                     
            },
            add(burger){
                this.$store.commit('panier',burger)
                this.$store.commit('count_long')
            }
        },
        computed:{
            ...mapGetters(['user','root']),
            burgers(){
                return this.$store.state.burgers
            }
            
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
    .text-orange{
        color: orange;
    }
    .ui.button.big.box-blue{
        background-color: #4730db;
        color: #ffffffff;

    }
    #segment{
        min-width:350px;
        height:330px
    }
    #segment-1{
        max-width:400px;
        height:500px;
        margin-top:10px;
    }
    .grid-inq-2{
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
    }
    .grid-3{
        display: grid;
        grid-template-columns:1fr 1fr 1fr;
        column-gap: 10px;
    }
    .grid-3 .content{
        left: 0;
        text-align: initial;
    }
    
    .space-2{
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
    }
    .ps-2{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .grid-2{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .grid-2 #g-1{
        width: 50%;
    }
    .grid-2:nth-child(1){
        width: 100%;
    }
    .grid-2:nth-child(1) img{
        width: 90%;
    }
    .sub-title{
        font-size: 1.4em;
        opacity: 0.6;
    }
    .marge{
        margin-top: 100px;
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
    }
    #pos{
        bottom:10px;
        position:absolute;
        left: 20%;
        
    }
    #position-1{
        position: absolute;
        bottom: 10px;
        left: 10px;
    }
    #position-1 .right{
        padding-left: 50px;
    }
    @media screen and (max-width:768px) {
        .grid-3{
            grid-template-columns:  1fr;
        }
    }
    
</style>