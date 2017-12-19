<template>
   <div class="g-textApi">
     <p class="title is-5 has-text-centered">
       提交图片
     </p>
     <div class="c-content">
        <div class="field">
          <input type="file" @change="change">
        </div>
       <div class="field is-grouped is-grouped-centered">
         <p class="control">
           <a class="button is-primary" @click="submit">
             Submit
           </a>
         </p>
         <p class="control">
           <a class="button is-light">
             Cancel
           </a>
         </p>
       </div>
       <div class="field">
         <img v-if="imgSrc" :src="imgSrc" alt="">
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
import axios from 'axios'

   export default {

    data () {
     return {
        formData:'',
       imgSrc:''
     }
    },
     mounted(){


     },
     methods:{
          submit(){
            axios.post("/api/index/uploadImg", this.formData, {
              "content-type": "multipart/form-data"
            }).then((res)=> {
              res = res.data;
               if(res.success){
                 this.imgSrc =res.data.pictureUrl
               }
            });
          },
          change(e){
              let file = e.target.files[0];
              this.formData = new FormData();
              this.formData.append("file", file);
              this.formData.append("time", (new Date().getTime()));
              console.log(this.formData)
          }
     }
  }
</script>

