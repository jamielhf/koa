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

export default {
  name: 'app',
  components:{
    HeaderCom,
    FooterCom
  }
}
</script>
