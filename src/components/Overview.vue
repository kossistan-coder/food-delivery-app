<template>
    <div>
        <sui-header>Overview</sui-header>
        <div class="grid-half">
            <div>
          
                <div class="grid-3">
                    <div v-for="card in cards" :key="card.title">
                        <Card :icon="card.icon" :title="card.title" :sub="card.price"></Card>
                    </div>
                </div>
                <br>
                <div>
                    <div class="ui segment" :class="{'loading':place}">
                        <div class="flex-2">
                            <div>
                                <sui-header>Recent Posts</sui-header>
                            </div>
                            <div>
                                <router-link :to="{name:'posts'}" class="ui mini basic button">View all</router-link>
                            </div>
                        </div>
                        <sui-item-group divided >
                        <sui-item v-for="food in foods" :key="food.name">
                            <img :src="food.image" alt="" class="ui small image" style="width:150px;height:150px">
                            <sui-item-content>
                                <sui-item-header>{{food.name}}</sui-item-header>
                                <sui-item-meta>
                                <span>$ {{food.price}} </span>
                                </sui-item-meta>
                                <sui-item-description>
                                <p>
                                    {{food.description}}
                                </p>
                                </sui-item-description>
                                <sui-item-extra>
                                    <div v-if="food.admin.id == user.id">
                                        You
                                    </div>
                                    <div v-else>
                                        By {{food.admin.email}}
                                    </div>
                                </sui-item-extra>
                            </sui-item-content>
                            </sui-item>
                        </sui-item-group>
                    </div>
                </div>
            </div>
            
            <div>
                <div class="ui segment" >
                    <sui-header>
                        List of admin
                    </sui-header>
                    <div>
                            <div class="flex-2">
                            <div>
                                <h2 class="ui small header">
                                <img src="../assets/admin1.jpg" class="ui circular image">
                                <div class="content">
                                    Kamara laye
                                    <div class="sub header">kamara@gmail.com</div>
                                </div>
                            </h2>
                            </div>
                            <div>
                                <div class="ui circular basic label">
                                    
                                    Details
                                </div>
                            </div>
                        </div>
                        <div class="ui divider"></div>
                    </div>
                    <div>
                            <div class="flex-2">
                            <div>
                                <h2 class="ui small header">
                                <img src="../assets/admin2.jpg" class="ui circular image">
                                <div class="content">
                                    Tiana lawson
                                    <div class="sub header">tianaLawson234@gmail.com</div>
                                </div>
                            </h2>
                            </div>
                            <div>
                                <div class="ui circular basic label">
                                    
                                    Details
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <br>
                    <div class="ui fluid basic button">View all</div>

                </div>
                <div class="ui segment">
                    <sui-header>Number of users</sui-header>
                       <div class="box-center">
                           <vue-ellipse-progress
                        :angle="-90"
                        color="#4730db"
                        :colorFill="colorFillGradient"
                        :legend="true"
                        :legendValue="180"
                        :progress="89"            
                        :loading="false"
                        >
                        <p slot="legend-caption">Users</p>
                        </vue-ellipse-progress>
                       </div>
                       <div class="ui divider"></div>
                       <sui-header>Summary about users</sui-header>
                       <Uiheader title="Users registered" value="2039"></Uiheader>
                       <br>
                       <Uiheader title="Number of payment" value="249"></Uiheader>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Card from './Card.vue'
import Uiheader from './Uiheader.vue'
import axios from 'axios'
    export default{
        data(){
            return{
                routes:'',
                place:true,
                user:{},
                foods:[],
                cards:[
                  {
                      icon:"balance scale",
                      title:"Your posts",
                      price:"34"
                  },
                  {
                      icon:"sync alternate",
                      title:"Burger bought",
                      price:"$ 30,659.45"
                  },
                  {
                      icon:"check ",
                      title:"Number of admins",
                      price:"34"
                  }
              ],
              
            }
        },
        components:{
            Card,
            Uiheader
        },      
        mounted() {
            this.user = this.$store.getters.user
            this.routes = '/api/admin/'+this.$store.getters.user.id+'/limit/'+3
           
            axios.get(this.routes).then(response=>{
                this.foods = response.data.posts
                this.place = false
               
            })
           
           
        },
    }
</script>
<style scoped>

    .grid-half{
        display:grid;
        grid-template-columns: 1.9fr 1fr;
        column-gap:20px;
        margin-top:20px;
    }
    .grid-3{
        display:grid;
        grid-template-columns : 1fr 1fr 1fr ;
        column-gap:10px;
    }
    .flex-2{
        display: flex;
        justify-content: space-between;
    }
    .ui.segment{
        border-radius: 7px !important;
    }
    .box-center{
        display: flex;
        justify-content:center;
    }
</style>