<template>
  <div class="g-textApi">

    <p class="title is-5 has-text-centered">
      百度图片文字识别
    </p>

    <div class="c-content has-text-centered">
      <div
        @dragenter="ondragenter"
        @dragover="ondragover"
        @dragleave="ondragleave"
        @drop="ondrop"
        class="field img-box" ref="select_frame">
    拖动图片到这里
      </div>
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <a class="button is-primary" >
            {{p}}%
          </a>
        </p>

      </div>
      <p class="has-text-centered">
        图片要求： 大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
      </p>
      <div class="field">
        {{result}}
      </div>


    </div>

  </div>
</template>
<style scoped>
  p.c-list{

  }
  .c-content{
    width: 500px;

    margin: 30px auto;
  }
  .img-box{
    height: 300px;
    line-height: 300px;
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
        p:0,
        result:''
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
        }else if(data.length>2){
            alert('最多只能上传一张图片')
            return
        }

        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          if (!/(jpg|png|jpeg)/g.test(data[i].name) ){
            alert('只允许上传jpg,jpeg或png文件');
            return;
          }
          this.fileList = this.fileList.concat(data[i])
          formData.append('uploadfile', data[i], data[i].name);
        }
        axios({
          method:"POST",
          url:'/api/index/testImg',
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
          this.p = 0;
          if(res.success){
            this.result = res.data.words_result;
          }else{
            this.result = res.data;
            alert(res.message)
          }
        });
      },

      change(e){
        let file = e.target.files[0];
        this.formData = new FormData();
        this.formData.append("file", file);
        this.formData.append("time", (new Date().getTime()));

      }
    }
  }
</script>

