<template>
    <div>
        <div class="box-flex">
            <div>
                <h2 class="ui medium header">
            {{title}}
            <div class="sub header" id="blue-value">{{value}}</div>
            </h2>
            </div>
            <div>
                <div class="ui circular mini icon button" style="background-color:#4730db ;color:#ffffff">
                    <i class="arrow right icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:String,
            value:String
        }
    }
</script>
<style scoped>
    .box-flex{
        display: flex;
        justify-content: space-between;
    }
 
</style>