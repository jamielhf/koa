<template>
   <div class="g-cheerio">
     <h1 class="title has-text-centered">爬虫demo</h1>
     <p class="title is-5 has-text-centered">简单爬了掘金前端下的文章</p>
     <ul>
       <li v-for="item in dataList">
         <a target="_blank" :href="item.artUrl">{{item.title}}</a>
       </li>
     </ul>

   </div>
</template>
<style scoped>
  .g-cheerio{
    position: relative;
  }
  ul{
    position: relative;
    width: 900px;
    margin: 0 auto;
  }
  ul li{
    padding: 5px 0;
  }
  ul a{
    font-size: 18px;

    color: #333;
  }
  ul a:hover{
    color: #3273dc;
  }
</style>
<script>
import api from '../api/api'
   export default {
    data () {
     return {
       dataList:[],
     }
    },
     computed:{

     },
     mounted(){

       api.index.articleList().then((res)=>{
         console.log(res)
         if(res.data.success){
           this.dataList = res.data.data.article
         }

       })
     },
     methods:{

     }
  }
</script>

