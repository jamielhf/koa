<template>
   <div class="g-cheerio">
     <h1 class="title has-text-centered">爬虫demo</h1>
     <p class="title is-5 has-text-centered">简单爬了掘金前端下的文章</p>
     <ul>
       <li v-for="item in dataList">
         <p>价格：{{item.amount}}</p>
         <p>稀有程度：{{item.rareDegreeDec}}</p>
         <p>{{item.desc}}</p>
         <p>第{{item.generation}}代</p>
         <p>{{item.id}}</p>
         <p>{{item.petId}}</p>
         <img width="100px" :src="item.petUrl">

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
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  }
  ul li{
    padding: 5px 0;
    width: 250px;
  }
  ul a{
    font-size: 18px;
    cursor: pointer;
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
         console.log(res.data.data.petsOnSale)
         if(res.success){
           this.dataList = res.data.data.petsOnSale

           this.dataList.map(function (i, k) {
             switch (  i.rareDegree){
               case 0:i.rareDegreeDec='普通';break;
               case 1:i.rareDegreeDec='稀有';break;
               case 2:i.rareDegreeDec='卓越';break;
               case 3:i.rareDegreeDec='史诗';break;
               case 4:i.rareDegreeDec='神话';break;
               default:i.rareDegreeDec='不明'
             }
           })


         }

       })
     },
     methods:{

     }
  }
</script>

