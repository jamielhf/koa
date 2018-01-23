<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </a>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="/">
            demo
          </a>
          <div class="navbar-dropdown is-boxed">
            <router-link class="navbar-item" to="socket">
              socket.io
            </router-link>
            <router-link class="navbar-item" to="superagent">
              爬虫
            </router-link>
            <router-link class="navbar-item" to="uploadImg">
              上传图片
            </router-link>

            <router-link class="navbar-item" to="testApi">
              测试接口工具
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">

            <p class="control" v-if="!isLogin">
              <router-link class="button is-primary" to="/login">
              <span class="icon">
                <i class="fa fa-user"></i>
              </span>
                <span>登录</span>
              </router-link>
            </p>
            <p class="control" v-if="isLogin">
              <a class="button "  >
              <span class="icon">
                <i class="fa fa-user"></i>
              </span>
                <span>{{username}}</span>
              </a>
            </p>
            <p class="control" v-if="isLogin">
              <a class="button "  @click="logout">
              <span class="icon">
                <i class="fa fa-user"></i>
              </span>
                <span>退出</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import api from '../api/api'
  import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {

    }
  },

  computed:{
     isLogin(){
         return this.$store.getters.getUserInfo.isLogin||false
     },
      username(){
        return this.$store.getters.getUserInfo.username||''
      }

  },
  methods:{
    logout(){
        api.user.logout().then((res)=>{
            if(res.success){
              this.$store.dispatch('setUserInfo',{
                username:'',
                isLogin:''
              });
              alert('已退出')
              this.$router.push('/')
            }else{
                alert(res.message)
            }


        })
    }
  }
}
</script>


