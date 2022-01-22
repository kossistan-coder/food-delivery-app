<template>
    <div  >
        <sui-menu fixed borderless>
            <sui-menu-item >
                <router-link :to="{name:'home'}" class="ui tiny header">
                    <img src="../assets/Burger.png" alt="">
                    <div class="content">
                        BurgerHouse
                    </div>
                </router-link>
            </sui-menu-item>
         
            

            <sui-menu-menu position="right">
                
                
                <sui-dropdown item icon="user" v-show="root == 0">
                   
                    <sui-dropdown-menu>
                        <sui-dropdown-item><router-link :to="{name:'register'}" class="text-black">Register</router-link></sui-dropdown-item>
                        <sui-dropdown-item><router-link :to="{name:'login'}" class="text-black">Log In</router-link></sui-dropdown-item>
                        <sui-dropdown-item ><a href="javascript:void(0)" @click="logout">Log out</a></sui-dropdown-item>
                    </sui-dropdown-menu>
                </sui-dropdown>
                <router-link :to="{name:'panier'}" is="sui-menu-item" v-show="this.$store.getters.root == 0">
                    <sui-icon name="shopping cart" /> 
                    <sui-label style="background-color: #4730db;" relative>
                        {{this.$store.state.total}}
                    </sui-label>
                </router-link>
                <sui-menu-item right>
                <sui-input transparent icon="search" placeholder="Search..." />
                </sui-menu-item>
            </sui-menu-menu>
        </sui-menu>
    <div id="pade">
        <div class="ui  button" style="background-color:#4730db;color:#ffffff;">Payer</div>
            <div class="ui left labeled button" tabindex="0">
                <a class="ui basic right pointing label">
                    $ {{this.$store.state.sum}}
                </a>
                <div class="ui button">
                    <i class="shopping cart icon"></i> Total
                </div>
            </div>
            <table class="ui very basic collapsing celled table segment">
  <thead>
    <tr><th style="text-align:center">Product</th>
    <th style="text-align:center">Quatity</th>
    <th style="text-align:center">Actions</th>
  </tr></thead>
  <tbody>
    <tr v-for="item in store" :key="item.id">
        <td  class="ui items " style="width:50%">
            <div class="item" style="padding:20px">
                    <div class="image">
                    <img :src="item.image" style="height:150px; width:200px" class="ui small image">
                    </div>
                    <div class="content" style="padding-left:50px">
                    <a class="header">{{item.name}} </a>
                    <div class="description" >
                        <p>{{item.description}}</p>
                        
                    </div>
                    
                    <div class="extra" >
                        <span class="left floated" s>
                           Price : $ {{item.price}}
                        </span>
                        <span class="right floated">
                            Delivery time : {{item.delivery_time}}
                        </span>
                    </div>
                    </div>
                </div>
        </td>
        <td style="text-align:center">
            {{item.nombre}}
        </td>
        <td style="width:15% ; text-align:center">
            <div class="ui red tiny button" @click="remove(item.id)">Remove product</div>
        </td>
    </tr>
   
   
  </tbody>
</table>
    </div>
        
    </div>
</template>
<script>
import axios from 'axios'
    export default{
        data() {
            return {
                store:[],
                root:5
            }
        },
        mounted() {
            document.querySelector('body').style.backgroundColor='#f3f4f6'
            this.store = this.$store.getters.panier
            if (localStorage.getItem('root')) {
                this.root = localStorage.getItem('root')
            }
            this.$store.commit('sum')
        },
        methods: {
            remove(id){
                let product = this.$store.getters.panier.findIndex(item => item.id === id)
                this.$store.commit('remove_product',product)
                this.$store.commit('count_long')
                this.$store.commit('sum')
            },
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
                     
            }
        },
    }
</script>
<style scoped>
    .flex-center{
        padding: 100px;
    }
    #pade{
        padding: 100px;
    }
</style>