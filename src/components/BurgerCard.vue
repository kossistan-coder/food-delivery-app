<template>
    <div>
        <div class="ui fluid card">
                <div >
                    <img :src="image" style="height: 250px;width:100%;">
                </div>
                <div class="content">
                    <a class="header">{{nom}}</a>
                    <div class="meta">
                    <span class="date">$ {{price}}</span>
                    </div>
                    <div class="description">
                        {{description}}
                    </div>
                </div>
                <div class="extra content">
                    <span class="left floated" v-show="root == 0">
                        <a class="ui left labeled mini blue icon button" @click="add(id)" >
                            <i class="shopping cart icon"></i>
                            Add to card
                        </a>
                    </span>
                    <span class="right floated">
                       Delivery time : {{time}} min
                    </span>
                </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            burgers:[],
            enable:0,
            temp:[]
        }
    },
    props:{
        image:String,
        nom:String,
        time:Number,
        price:Number,
        description:String,
        root:Number,
        id:Number,
        panier:[],

     
    },
    mounted() {
 
         axios.get('/api/posts').then((response)=>{
                this.burgers = response.data.posts
               
            })
         

            this.burgers.forEach(element => {
                element['nombre'] = 0
            });
    },
    methods: {
        add(id){
            
            this.burgers.forEach(element => {
                if (element.id == id) {
                    
                    if (this.temp.includes(element)) {
                        console.log(this.temp.indexOf(element));
                    }else{
                        this.temp.push(element)
                    }
                    
                    
                }
     
                
            });
    

            
        }
    },
}
</script>