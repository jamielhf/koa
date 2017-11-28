<template>
   <div class="g-login">
     <div class="m-content">


     <div class="field">
       <p class="control has-icons-left has-icons-right">
         <input class="input" type="text" placeholder="email" v-model="email">
         <span class="icon is-small is-left">
      <i class="fa fa-user"></i>
    </span>

       </p>
     </div>

     <div class="field">
       <p class="control has-icons-left">
         <input class="input" type="password" v-model="pwd" placeholder="Password">
         <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
       </p>
     </div>
     <div class="field">
       <p class="control">
         <button class="button is-success" @click="login">
           登录
         </button>
         <router-link to="/register" class="button">
           注册
         </router-link>
       </p>
     </div>
     </div>
   </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .g-login{
    margin: 0 auto;
    width: 1000px;
  }
  .g-login .m-content{
    margin: 0 auto;
    width: 350px;

  }
</style>

<script>


import api from '../api/api'
export default {
  data () {
    return {
      email: '',
      pwd: '',
    }
  },
  mounted(){

  },
  components:{

  },
  methods:{
    login(){

      let  hash = md5(this.pwd);
      api.login(this.email,hash).then((res)=>{
          let d = res.data;
         if(d.success){

           this.$store.dispatch('setUserInfo',{
             username:d.data.userName,
             isLogin:d.data.isLogin
           })

           this.$router.push('/')
         }else{
             alert(d.message)
         }
      })
    }
  }

}
</script>

