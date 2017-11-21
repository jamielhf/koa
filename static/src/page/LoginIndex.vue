<template>
   <div class="g-login">
     <div class="field">
       <p class="control has-icons-left has-icons-right">
         <input class="input" type="email" placeholder="Email">
         <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
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
       </p>
     </div>

   </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .g-login{
    margin: 0 auto;
    width: 1000px;
  }
  .g-login .field{
    margin: 0 auto;
    width: 300px;
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

