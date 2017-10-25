<template>
  <div id="app">
    <HeaderCom></HeaderCom>

    <router-view/>
    <FooterCom></FooterCom>

  </div>
</template>

<script>
  import './css/font-awesome.min.css'
  import './css/bulma.min.css'
  import FooterCom from './components/Footer.vue'
  import HeaderCom from './components/Header.vue'
export default {
  name: 'app',
  components:{
    FooterCom,
    HeaderCom
  }
}
</script>

