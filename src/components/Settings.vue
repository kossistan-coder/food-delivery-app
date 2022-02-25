<template>
    <div>
       
        <div class="flex-space" v-show="user.id ==1">
            <div>
                <div class="ui label"><sui-header>Add new admin</sui-header></div>
                <div>
                    <br>
                    <div v-if="noti !=''">
                        <div class="ui success message">
                            <i class="close icon" @click="close"></i>
                            {{noti}}
                        </div>
                    </div>
                    <div v-if="Object.keys(errors).length !==0">
                        <div class="ui negative message">
                            <i class="close icon" @click="close"></i>
                    <sui-list v-for="error in errors.name" :key="error.name" bulleted>
                        <sui-list-item>
                            {{error}}
                        </sui-list-item>
                    </sui-list>
                    <sui-list v-for="error in errors.email" :key="error.email" bulleted>
                        <sui-list-item>
                            {{error}}
                        </sui-list-item>
                    </sui-list>
                    <sui-list v-for="error in errors.password" :key="error.password" bulleted>
                        <sui-list-item>
                            {{error}}
                        </sui-list-item>
                    </sui-list>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="ui segment">
                    <form method="post" class="ui form" @submit.prevent="createAdmin">
                        <div class="field">
                            <label for="">Name</label>
                            <input type="text" placeholder="Enter your name" v-model="admin.name">
                        </div>
                        <div class="field">
                            <label for="">Email</label>
                            <input type="email" placeholder="Enter your email" v-model="admin.email">
                        </div>
                        <div class="field">
                            <label for="">password of the admin</label>
                            <input type="password" placeholder="Enter admin's password" v-model="admin.password">
                        </div>
                        <div class="field">
                            <label for="">Retype the password</label>
                            <input type="password" placeholder="confirm the admin password" v-model="admin.password_confirmation">
                        </div>
                        <div class="field">
                            <button type="submit" class="ui submit button" :class="{'loading':c_load}" style="background-color: #4730db;color:#ffffff">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div class="flex-space">
            <div>
                <div class="ui label"><sui-header>Add new post</sui-header></div>
                <div>
                    <div>
                    <br>
                    <div v-if="post !=''">
                        <div class="ui success message">
                            <i class="close icon" @click="closePost"></i>
                            {{post}}
                        </div>
                    </div>
                    <div v-if="Object.keys(post_error).length !==0">
                        <div class="ui negative message">
                            <i class="close icon" @click="closePost"></i>
                            <sui-list v-for="error in post_error.name" :key="error.name" bulleted>
                                <sui-list-item>
                                    {{error}}
                                </sui-list-item>
                            </sui-list>
                            <sui-list v-for="error in post_error.description" :key="error.description" bulleted>
                                <sui-list-item>
                                    {{error}}
                                </sui-list-item>
                            </sui-list>
                            <sui-list v-for="error in post_error.delivery_time" :key="error.delivery_time" bulleted>
                                <sui-list-item>
                                    {{error}}
                                </sui-list-item>
                            </sui-list>
                            <sui-list v-for="error in post_error.price" :key="error.price" bulleted>
                                <sui-list-item>
                                    {{error}}
                                </sui-list-item>
                            </sui-list>
                            <sui-list v-for="error in post_error.image" :key="error.image" bulleted>
                                <sui-list-item>
                                    {{error}}
                                </sui-list-item>
                            </sui-list>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div>
                <div class="ui segment">
                    <form method="post" class="ui form" ref="form" enctype="multipart/form-data" @submit.prevent="publish">
                        <div class="field">
                            <label for="">Name</label>
                            <input type="text" placeholder="Enter your name" name="name">
                        </div>
                        
                        <div class="field">
                            <label for="">Time</label>
                            <input type="number" placeholder="Time of deliver" name="time">
                        </div>
                        <div class="field">
                            <label for="">price</label>
                            <input type="number" placeholder="Enter the price of articles" name="price">
                        </div>
                        <div class="field">
                            <label for="">Image du produit</label>
                            <input type="file" name="image">
                        </div>
                        
                        <div class="field">
                            <label for="">Article description</label>
                            <textarea name="description"></textarea>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                <div class="ui radio checkbox">
                                <input type="radio" name="category" value="1">
                                <label for="">Farmming product</label>
                            </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                <input type="radio" name="category" value="0">
                                <label for="">Burger</label>
                            </div>
                            </div>
                        </div>
                        <div class="field">
                            <button type="submit" class="ui submit button" :class="{'loading':p_load}" style="background-color: #4730db;color:#ffffff" >
                                Publish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        
    </div>
</template>
<script>
import axios  from "axios"
import { mapGetters } from "vuex"
    export default {
        data() {
            return {
                admin:{
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:''
                },
                category: null,
                options: [
                    {
                    text: 'Produits agricole',
                    value: 1,
                    },
                    {
                    text: 'Burger',
                    value: 0,
                    },
                ],
                
                noti:'',
                errors:{},
                post:'',
                post_error:{},
                c_load:false,
                p_load:false,
                user:{},
                routes:''
            }
        },
        methods: {
            createAdmin(){
                this.c_load = true
                // eslint-disable-next-line no-unused-vars
                axios.get('/sanctum/csrf-cookie').then(response => {
                     axios.post('/api/admin',this.admin).then(response=>{
                         this.noti = response.data.message
                         this.c_load = false
                     }).catch((errors)=>{
                         this.errors = errors.response.data.errors
                         this.c_load = false    
                     })
                    
                });
                
            },
            close(){
                this.errors ={}
                this.noti = ''
            },
            closePost(){
                this.post = ''
                this.post_error={}
            },
            
            publish(){
                this.p_load = true
                let vm =this
               
                let formData = new FormData(vm.$refs.form)
             
                // eslint-disable-next-line no-unused-vars
                axios.get('/sanctum/csrf-cookie').then(response =>{
                    // eslint-disable-next-line no-unused-vars
                    axios.post(this.routes,formData).then(response=>{
                        
                        this.post = response.data.message
                        this.p_load = false
                    }).catch((errors)=>{
                        this.post_error = errors.response.data.errors
                        this.p_load = false
                    })
                })

                this.$router.pusher({name:'settings'})
                
            },
            
        },
        mounted() {
            this.user = this.$store.getters.user
            this.routes = "/api/admin/"+this.user.id+"/post"
        },
       
        computed:{
            ...mapGetters(['user','root'])
        }
    }
</script>
<style scoped>
 
    .flex-space{
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        column-gap: 10px;
    }
</style>