<template>
    <div class="half">
       <div>
           
           <div class="ui label">
               <sui-header>
                   Modify {{food.name}} post
               </sui-header>
           </div>
           <div>
               <br>
               <div v-if="post !=''">
                        <div class="ui  message">
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
        <div >
            
            <div class="ui segment">
                <form class="ui form" method="post" ref="form" @submit.prevent="submit" enctype="multipart/form-data">
               
                <div class="field">
                    <label for="">New Name</label>
                    <input type="text"  name="name">
                </div>
                <div class="field">
                    <label for="">Delivery time</label>
                    <input type="number"  name="time">
                </div>
                <div class="field">
                    <label for="">Price</label>
                    <input type="number"  name="price">
                </div>
                <div class="field">
                    <input type="file"  name="image">
                </div>
                <div class="field">
                    <label for="">New description</label>
                    <textarea name="description">

                    </textarea>
                </div>
                <div class="field">
                    <button class="ui button" type="submit" id="sub-button">Modify</button>
                </div>
            </form>
            </div>
        </div>
        <div>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            food:[],
            route:'',
            post:'',
            post_error:{},
            
        }
    },
    mounted() {
        this.food = this.foods.find(element => element.id == this.id)
        
    },
    computed:{
        id(){
            return this.$route.params.id
        },
        foods(){
            return this.$route.params.foods
        },
        admin(){
            return this.$store.state.user.id
        }
    },
    methods: {
        submit(){
            this.route = "/api/admin/"+this.admin+"/post/"+this.id
            let form = new FormData(this.$refs.form)
            console.log(this.route);
            // eslint-disable-next-line no-unused-vars
            axios.get('/sanctum/csrf-cookie').then(response =>{
                // eslint-disable-next-line no-unused-vars
                axios.put(this.route,form).then(response=>{
                    this.post = response.data.message
                }).catch((errors)=>{
                    this.post_error = errors.response.data.errors
                })
            })
        },
        closePost(){
                this.post = ''
                this.post_error={}
            }
    },
}
</script>
<style scoped>
    .half{
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 20px;
    }
    #file-upload{
        border-radius: 100%;
        border: 1px solid blue;
    }
    #sub-button{
        background-color: #4730db;
        color: #ffffffff;
    }
</style>