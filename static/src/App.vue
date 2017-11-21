<template>
  <div id="app">
    <HeaderCom></HeaderCom>

    <router-view/>

    <FooterCom></FooterCom>
  </div>
</template>

<script>
  import HeaderCom from './components/Header';
  import FooterCom from './components/Footer';
import './css/base.scss';

export default {
  name: 'app',
  components:{
    HeaderCom,
    FooterCom
  }
}
</script>
