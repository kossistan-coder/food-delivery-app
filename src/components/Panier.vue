<template>
    <div  >
        <div v-for="item in store" :key="item.id" class="ui items segment" style="margin-left:300px;margin-right:300px">
            <div class="item" >
                    <div class="image">
                    <img :src="item.image" style="height:150px; width:200px" class="ui small image">
                    </div>
                    <div class="content">
                    <a class="header">{{item.name}} </a>
                    <div class="description">
                        <span>{{item.description}}</span>
                        <span>{{item.nombre}}</span>
                    </div>
                    <div class="description">
                        <p></p>
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
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                store:[]
            }
        },
        mounted() {
            this.store = this.$store.getters.panier
        },
    }
</script>
<style scoped>
    .flex-center{
        padding: 100px;
    }
</style>