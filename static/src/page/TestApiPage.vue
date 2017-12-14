<template>
   <div class="g-textApi">
     <div class="c-content">
       <div class="field">
         <label class="label">url地址</label>
         <div class="control">
           <input class="input" v-model="url" type="text" placeholder="url">
         </div>
       </div>

       <div class="field">
         <label class="label">请求类型</label>
         <div class="control">
           <div class="select">
             <select v-model="type">
               <option value="get">get</option>
               <option value="post">post</option>
             </select>
           </div>
         </div>
       </div>

       <div class="field">
         <label class="label">数据</label>
         <div class="control">
           <textarea class="textarea" v-model="data" placeholder="数据"></textarea>
         </div>
       </div>

       <div class="field is-grouped">
         <div class="control">
           <button class="button is-link" @click="submit">提交</button>
         </div>

       </div>

       <div class="field">
         <label class="label">返回的数据</label>
         <div>

         </div>
       </div>

     </div>

   </div>
</template>
<style scoped>
  .c-content{
    width: 500px;
    margin: 0 auto;
  }
</style>
<script>

import api from '../api/api'

   export default {

    data () {
     return {
       dataList:[],
       url:'',
       data:'',
       type:'get',
     }
    },
     mounted(){


     },
     methods:{
          submit(){
              api.testApi(this.url,this.type,this.data).then((res)=>{
                  console.log(res)
              })
          }
     }
  }
</script>

