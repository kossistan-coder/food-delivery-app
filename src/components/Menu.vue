<template>
    <div>
        <sui-menu attached="top" borderless>
      <sui-menu-item >
          <sui-input transparent icon="search" placeholder="Search..." />
        </sui-menu-item>

      <sui-menu-menu position="right">
          <sui-menu-item>
             <sui-dropdown>
                 <a is="sui-label" size="small" style="background-color: #ffffff; color:#36393a ">
                <img src="../assets/admin.jpg" alt="" class="ui right spaced tiny avatar image">
                {{nom}}
                </a>
             <sui-dropdown-menu style="width: 100%;">
                 <sui-dropdown-item >
                 <a href="javascript:void(0)" @click="logout" style="color:black;">Log out</a>
             </sui-dropdown-item>
             </sui-dropdown-menu>
             </sui-dropdown>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>
     <sui-segment attached="bottom">
      <h2 class="ui sub header">
        Personnal dashboard
      </h2>
    <br>
        <div class="flex-2">
            <div>
                <h2 class="ui medium header">
        <img src="../assets/admin.jpg" class="ui circular image">
        <div class="content">
            Good morning
            <div class="sub header">
                {{nom | capitalize}} ,               
                compte active
                <i class="check circular green inverted tiny icon"></i>
                </div>
        </div>
        </h2>
            </div>
            <div>
                <div class="ui button basic">
                    New Post
                </div>
                <div class="ui button" style="background-color: #4730db;color:#ffffffff">
                    Add admin
                </div>
            </div>
        </div>

    </sui-segment>
        
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:{
        nom : String
    },
    filters:{
        capitalize(value){
            if (!value) return ''
            
            return value.toUpperCase()
        }
    },
    methods: {
        logout(){
            axios.post('api/logout')
                    localStorage.removeItem('root')
                     localStorage.removeItem('token')
                     localStorage.removeItem('user')
                     this.$store.dispatch('user',{})
                     this.$store.dispatch('root',null)
                     this.$router.push({name:'home'})
        }
    },
}
</script>
<style scoped>
    .flex-2{
        display: flex;
        justify-content: space-between;
    }
</style>