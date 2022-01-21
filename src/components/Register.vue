/* eslint-disable no-unused-vars */
<template >
    <div >
        <div class="flex-center">
            <div v-if="Object.keys(errors).length !==0 " id="message">
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
        <div class="flex-center">
            
            <div>
                <div class="ui segment" id="size">
                <h2 class="text-center ui header" >
                    <img src="../assets/Burger.png" alt="" class="ui tiny image">
                    Create Account
                    </h2>
                <sui-form  @submit.prevent="register">
                    <sui-form-field>
                        <label>Username</label>
                        <input placeholder="Username" type="text" name="name" v-model="form.name"/>
                       
                    </sui-form-field>
                    <sui-form-field>
                        <label>Email</label>
                        <input placeholder="Your email adress" type="email" name="email" v-model="form.email"/>
                       
                    </sui-form-field>
                    <sui-form-field>
                        <label>Password</label>
                        <input placeholder="password" type="password" name="password" v-model="form.password"/>
                        
                    </sui-form-field>
                    <sui-form-field>
                        <label>Confirm your password</label>
                        <input placeholder="Retype your password" type="password" name="password_confirmation" v-model="form.password_confirmation"/>
                    </sui-form-field>
                    <sui-form-field>
                       <sui-button type="submit" size="fluid" class="box-blue" :class="{'loading':isload}">Register</sui-button>
                    </sui-form-field>
                </sui-form>
                
            </div>
            <div>
                <sui-message>
    
                <p>
                    I have already an account , <router-link to="/login">Log in</router-link>
                </p>
                </sui-message>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"


    export default{
        data(){
            return{
                form:{
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:''
                },
                errors:{},
                message:'',
                isload:false
            }
        },
        methods:{
             async register(){
                 this.isload = true
                 // eslint-disable-next-line no-unused-vars
                 axios.get('/sanctum/csrf-cookie').then(response => {
                     axios.post('api/register',this.form).then((response)=>{
                    localStorage.setItem('message',response.data.message)
                    this.$router.push({name:'login' , params:this.message})
                }).catch((errors)=>{
                    this.errors = errors.response.data.errors
                    this.isload=false
                })
                });
                

               
            },

            close(){
                this.errors={}
            }
        },
        mounted() {
            document.querySelector('body').style.backgroundColor='#f3f4f6'
        },
    }
</script>
<style src="../assets/color.css" ></style>
<style scoped>
    .flex-center{
        display: flex;
        justify-content: center;
        padding-top: 40px;


    }


    
</style>