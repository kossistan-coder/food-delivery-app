<template>
    <div>
        
        <sui-menu
            is="sui-sidebar"
        visible="true"
        width="medium"
        borderless
        vertical
        style="background-color: #2d3647;"
        >
            <sui-menu-item > 
                    <h2 is="sui-header" size="tiny" style="color:#ffffff">
                        <img src="../assets/Burger.png" alt="">
                        BurgerHouse
                    </h2>
            </sui-menu-item>
            <sui-menu-item active link>
                <router-link :to="{name:'overview'}"  style="color:#ffffff">
                    <sui-icon name="home"/>
                    Home
                </router-link>
            </sui-menu-item>
            <sui-menu-item>
                <div class="color-white">
                    <sui-icon name="history"/>
                    History
                </div>
            </sui-menu-item>
            <sui-menu-item>
                <div class="color-white">
                    <sui-icon name="balance scale"/>
                    Balances
                </div>
            </sui-menu-item>
            <sui-menu-item>
                <div class="color-white">
                    <sui-icon name="address card"/>
                    {{user.id}}
                </div>
            </sui-menu-item>
            <sui-menu-item>
                <div class="color-white">
                    <sui-icon name="users"/>
                    Recipients
                </div>
            </sui-menu-item>
            <sui-menu-item>
                <div class="color-white">
                    <sui-icon name="file alternate outline"/>
                    Reports
                </div>
            </sui-menu-item>
            <hr class="trait">
            <sui-menu-item>
                <router-link :to="{name:'settings'}" class="color-white">
                    <sui-icon name="setting"/>
                    Settings
                </router-link>
            </sui-menu-item>
            <sui-menu-item>
                <div class="color-white">
                    <sui-icon name=" help"/>
                    Reports
                </div>
            </sui-menu-item>
            <sui-menu-item>
                <div class="color-white">
                    <sui-icon name="privacy"/>
                    Reports
                </div>
            </sui-menu-item>
        </sui-menu>
       
        <sui-didebar-pusher>
            <div id="marge">
                <Menu :nom="user.name"></Menu>
                <div style="padding:20px">
                    
                    <router-view></router-view>
                </div>
            </div>
        </sui-didebar-pusher>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Menu from './Menu.vue'
import Overview from './Overview.vue'
    export default{
        data() {
            return {
                admin:{},
            }
        },
        mounted() {
            document.querySelector('body').style.backgroundColor='#f3f4f6'
             axios.get('api/admin').then(response =>{

                 this.$store.dispatch('user',response.data)
                 console.log(this.$store.getters.user);
                this.admin = response.data
                
            // eslint-disable-next-line no-unused-vars
            })
            console.log(localStorage.getItem('token'))
            if (localStorage.getItem('root')) {
                this.is_ad = localStorage.getItem('root')
                this.$store.dispatch('root',localStorage.getItem('root'))
            }
            
            
            this.$router.push({name:'overview'})
            
        },
        computed:{
            ...mapGetters(['user','root'])
        },
        components:{
            Menu,
            // eslint-disable-next-line vue/no-unused-components
            Overview
        }
    }
</script>
<style scoped>
    #marge{
        margin-left: 260px;

    }
    .grid-2{
        display: grid;
        grid-template-columns: 1.75fr 1fr;
        column-gap: 20px;
    }
    
    .color-white{
        color: #ffffffff;
    }
    .trait{
        opacity: .5;
    }
</style>