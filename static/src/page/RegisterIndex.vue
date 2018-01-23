<template>
   <div class="g-login">
     <div class="m-content">
       <div class="field ">
         <p class="control has-icons-left has-icons-right">
           <input class="input" type="text" placeholder="username" v-model="username" >
           <span class="icon is-small is-left">
      <i class="fa fa-user"></i>
    </span>

         </p>
       </div>
       <div class="field">
         <p class="control has-icons-left has-icons-right">
           <input class="input" type="email" placeholder="Email" v-model="email" >
           <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>

         </p>
       </div>
       <div class="field">
         <p class="control has-icons-left">
           <input class="input" v-model="pwd" type="password" placeholder="Password">
           <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
         </p>
       </div>
       <div class="field">
         <p class="control">
           <button class="button is-success" @click="submit">
             注册
           </button>
           <router-link to="/login" class="button ">
             返回登录
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
      username:'',
      pwd:''
    }
  },
  mounted(){

  },
  methods:{
      submit(){

        let  hash = md5(this.pwd);

        api.user.register(this.username,this.email,hash).then((res)=>{
            if(res.data.success){
              alert(res.data.message);
                this.$router.push('/login')
            }else{
              alert(res.data.message)
            }

        })
      }
  },
  components:{

  }

}
</script>

