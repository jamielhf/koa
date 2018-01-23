<template>
  <div id="app">
    <HeaderCom></HeaderCom>

    <router-view/>

    <FooterCom></FooterCom>
  </div>
</template>
<style>
  #app{
    position: relative;
    min-height: 1000px;
  }
  #app>div{
    position: relative;
    min-height: 800px;
  }
</style>
<script>
  import HeaderCom from './components/Header';
  import FooterCom from './components/Footer';
//import './css/base.scss';
import api from './api/api'
import util from './modules/util'
export default {
  name: 'app',
  components:{
    HeaderCom,
    FooterCom
  },
  created(){
    api.user.isLogin().then( (res) =>{
        if(!res.success){
          util.setCookie('isLogin','')
          util.setCookie('username','')
        }
    })
  }
}
</script>
