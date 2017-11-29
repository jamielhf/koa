<template>
   <div class="g-index">

   </div>
</template>

<script>
import api from '../api/api'

   export default {
    components: {

    },
    data () {
     return {

     }
    },
     mounted(){
        api.articleList().then((res)=>{
            console.log(res)
        })
     },
     methods:{

     }
  }
</script>

