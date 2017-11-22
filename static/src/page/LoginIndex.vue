<template>
   <div class="g-login">
     <div class="m-content">


     <div class="field">
       <p class="control has-icons-left has-icons-right">
         <input class="input" type="text" placeholder="username">
         <span class="icon is-small is-left">
      <i class="fa fa-user"></i>
    </span>

       </p>
     </div>

     <div class="field">
       <p class="control has-icons-left">
         <input class="input" type="password" placeholder="Password">
         <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
       </p>
     </div>
     <div class="field">
       <p class="control">
         <button class="button is-success">
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



export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{

  }

}
</script>

