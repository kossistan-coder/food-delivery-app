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
                        <a class="ui left labeled mini blue icon button" @click="add(this.burger)" >
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
        time:String,
        price:Number,
        description:String,
        root:Number,
        burger:[],
        panier:[],

     
    },

    methods: {
        add(burger){
            
            console.log(burger);
            
        }
    },
}
</script>