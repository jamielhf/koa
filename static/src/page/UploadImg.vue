<template>
   <div class="g-textApi">
     <p class="title is-5 has-text-centered">
       提交图片
     </p>
     <div class="c-content">
        <div
          @dragenter="ondragenter"
          @dragover="ondragover"
          @dragleave="ondragleave"
          @drop="ondrop"
          class="field img-box" ref="select_frame">

        </div>
       <div class="field is-grouped is-grouped-centered">
         <p class="control">
           <a class="button is-primary" >
              {{p}}%
           </a>
         </p>

       </div>
       <div class="field">
         <p v-for="item in fileList">
           {{item.name}}
         </p>


       </div>
       <!--<div class="field">-->
         <!--<div v-if="imgArr.length!=0" v-for="item in imgArr">-->
           <!--<img   :src="item.pictureUrl" alt="">-->
           <!--<p></p>-->
         <!--</div>-->
       <!--</div>-->

     </div>

   </div>
</template>
<style scoped>
  .c-content{
    width: 500px;
    margin: 0 auto;
  }
  .img-box{
    height: 300px;
    width: 100%;
    border: 1px dashed #999;
  }
</style>
<script>

import api from '../api/api'
import axios from 'axios'

   export default {

    data () {
     return {
       formData:'',
       fileList:[],
       imgArr:'',
       p:0
     }
    },
     mounted(){

     },

     methods:{
       ondragover(e){
         e.preventDefault();    //阻止拖来拖去的浏览器默认行为
       },
       ondragenter(e){
         e.preventDefault();  //阻止拖入时的浏览器默认行为
         this.$refs.select_frame.border = '2px dashed red';
       },
       ondragleave(e){
         e.preventDefault();  //阻止离开时的浏览器默认行为
       },
       ondrop(e) {
           e.preventDefault();    //阻止拖放后的浏览器默认行为
           const data = e.dataTransfer.files;  // 获取文件对象
           this.fileList = [];
           this.p=0;

           if (data.length < 1) {
             return;  // 检测是否有文件拖拽到页面
           }

           const formData = new FormData();
           for (let i = 0; i < data.length; i++) {
             console.log(data[i]);
             if (!/(jpg|png|jpeg)/g.test(data[i].name) ){
               alert('只允许上传jpg或png文件');
               return;
             }
             this.fileList = this.fileList.concat(data[i])
             formData.append('uploadfile', data[i], data[i].name);
           }
           axios({
             method:"POST",
             url:'/api/index/uploadImg',
             header:{
               "content-type": "multipart/form-data",
             },
             data:formData,
             onUploadProgress:  (progressEvent)=> {
               if(progressEvent.lengthComputable){
                 //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                 //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                this.p = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
               }
             },
           }).then((res)=> {
             res = res.data;
             if(res.success){
               this.imgArr = res.data;
               console.log(this.imgArr)
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

