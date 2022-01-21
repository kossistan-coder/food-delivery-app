/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
<template >
    <div >
        <div class="flex-center">
            <div v-show="error_message !='' && err_msg">
                <div class="ui negative message" id="size">
                    <i class="close icon" @click="close"></i>
                    <sui-list>
                        <sui-list-item>
                            {{error_message}}
                        </sui-list-item>
                    </sui-list>
                </div>
            </div>
            <div v-if="Object.keys(errors).length !==0 && !err_msg" id="message">
                <div class="ui negative message" id="size">
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
        <div class="flex-center">
            <div v-if="message !==''" id="size">
                
                <div class="ui success message">
                    <i class="close icon" @click="close"></i>
                    {{message}}
                </div>
            </div>
        </div>
        <div class="flex-center">
            <div>
                <div class="ui segment" id="size">
                <h2 class="text-center">BurgerHouse Account </h2>
                <sui-form method="post" @submit.prevent="login">
                    
                    <sui-form-field>
                        <label>Email</label>
                        <div class="ui left icon input">                          
                            <input placeholder="Your email adress" type="email" v-model="form.email"/>
                            <i class="user icon"></i>
                        </div>
                    </sui-form-field>
                    <sui-form-field>
                        <label>Password</label>
                        <div class="ui left icon input">                          
                            <input placeholder="Your password" type="password" v-model="form.password"/>
                            <i class="lock icon"></i>
                        </div>
                    </sui-form-field>
                    
                    <sui-form-field>
                       <sui-button type="submit" size="fluid" class="box-blue" :class="{'loading':isload}" >Log In</sui-button>
                    </sui-form-field>
                </sui-form>
                
            </div>
            <div>
                <sui-message>
    
                <p>
                    I don't have  an account , <router-link :to="{name:'register'}">register</router-link>
                </p>
                </sui-message>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default{
        data() {
            return {
                message:'',
                form:{
                    email:'',
                    password:''
                },
                token:'',
                errors:{},
                error_message:'',
                err_msg:Boolean,
                isload:false
              
            }
        },
        mounted() {
            document.querySelector('body').style.backgroundColor='#f3f4f6'
            if (localStorage.getItem('message')) {
                this.message = localStorage.getItem('message')
            }
        },
        methods: {
            close(){
                this.message=''
                this.errors={}
                this.error_message=''
                localStorage.removeItem('message')
            },
            login(){
                this.isload = true
                // eslint-disable-next-line no-unused-vars
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('/api/login',this.form).then(response=>{
                        
                        localStorage.setItem('token',response.data.token)
                        localStorage.setItem('user',response.data.user)
                        localStorage.setItem('root',response.data.root)
                        this.$store.dispatch('user',response.data.user)
                        this.$store.dispatch('root',response.data.root)
                        if (localStorage.getItem('root') == 0 ) {
                            this.$router.push({name:'home'})
                          
                        }else{
                            this.$router.push({name:'overview'})
                        }
                        
                    // eslint-disable-next-line no-unused-vars
                    }).catch((errors)=>{
                        
                        if (errors.response.data.message === "Identifiant ou mot de passe incorrect") {
                            this.error_message = errors.response.data.message
                            this.err_msg = true
                        }else{
                            this.errors = errors.response.data.errors
                            this.err_msg = false
                        }
                    })
                });
                this.isload = false
                
            }
        },
    }
</script>
<style src="../assets/color.css" scoped></style>
<style scoped>
    .flex-center{
        display: flex;
        justify-content: center;
        padding-top: 40px;
    
    }
  

    
</style>