<template>
    <div>
        <div>
            <div class="ui success message" v-show="msg !== ''">
                <i class="close icon" @click="close"></i>
                {{msg}}
            </div>
            
                    <div class="ui segment" :class="{'loading':place}">
                        <div class="flex-2">
                            <div>
                                <sui-header>All Posts</sui-header>
                            </div>
                           
                        </div>
                        <sui-item-group divided >
                        <sui-item v-for="food in foods" :key="food.id">
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
                                    <span class="left floated">
                                            <div v-if="food.admin.id == user.id">
                                            You
                                        </div>
                                        <div v-else>
                                            By {{food.admin.email}}
                                        </div>
                                    </span>
                                    <span class="right floated">
                                        <div class="ui mini red button" @click="sup(food.id)">Delete</div>
                                        <router-link :to="{name:'update',params:{id:food.id,foods:foods}}" class="ui mini blue button">Modify</router-link>
                                    </span>
                                </sui-item-extra>
                            </sui-item-content>
                            </sui-item>
                        </sui-item-group>
                    </div>
                </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                foods:[],
                routes:"",
                del_rout:"",
                msg:'',
                user:{},
                place : true
            }
        },
        mounted() {
            this.routes = '/api/admin/'+this.$store.getters.user.id+'/post'
            this.user = this.$store.getters.user
            axios.get(this.routes).then(response=>{
                this.foods = response.data.posts
                this.place = false
            })
        },

        methods: {
            sup(e){
                this.del_rout = '/api/admin/'+this.$store.getters.user.id+'/post/'+e
                axios.delete(this.del_rout).then(response=>{           
                    this.msg = response.data.message
                   this.foods.forEach(element => {
                       if (element.id == e) {
                           this.foods.splice(this.foods.indexOf(element),1)
                       }
                   });
                })
            },
            close(){
                this.msg = ''
            }
            
             
        },
    }
</script>