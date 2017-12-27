<template>
   <div class="g-socket">
     <h1 class="title has-text-centered">socket的demo</h1>

     <div class="g-main">
       <div class="columns is-desktop">
         <div class="column is-one-quarter c-list ">
           <ul>
             <li  class="active" @click="sel('room','001')">
               <p >默认群1</p>
             </li>
             <li  class="active" @click="sel('room','002')">
               <p >默认群2</p>
             </li>
           </ul>
         </div>
         <div class="column c-msg " >
           <ul v-for="item in allMsg">
             <li>{{item.user}}:{{item.msg}}</li>
           </ul>

         </div>
       </div>
       <div class="field is-grouped">
         <div class="control is-expanded">
           <input class="input" type="text"  placeholder="发送消息" v-model="msg">
         </div>
         <div class="control">
           <a class="button is-info" @click="sendMsg">
             发送内容
           </a>
         </div>
       </div>


     </div>

   </div>
</template>
<style scoped>
  .g-socket{

  }
  .c-list{
    padding: 0;
    background: #f5f5f5;
  }
  .c-list ul{
    position: relative;

  }
  .c-list li{
    position: relative;
    height: 50px;
    padding: 0 5px;
    box-sizing: border-box;
    line-height: 50px;
    border-bottom: 1px solid #ccc;

  }
  .c-list li:hover,.c-list li.active{
    background: #eee;
  }
  .c-msg{
    position: relative;
    overflow-y: scroll;
    height: 500px;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
  }
  .g-main{
    position: relative;
    width: 800px;
    height: 600px;
    margin: 0 auto;
  }
</style>
<script>
import api from '../api/api'
const socket = io.connect('http://localhost:3009');
   export default {
    components: {

    },
    data () {
     return {
       msg:'',
       allMsg:[],
       selMsg:[],
       type:'room',
       id:'001'
     }
    },
     computed:{
       user (){
           return this.$store.getters.getUserInfo.username
       }
     },
     mounted(){

       socket.on('sendRoomMsg',  (data) =>{

           console.log(data);
         this.allMsg.push(data)

       });

     },
     methods:{
        sendMsg(){
          socket.emit('sendMsg', {
              type:this.type,
              id:this.id,
              msg:this.msg,
              user:this.user
          });
          this.msg = ''
        },
       sel(type,id){
          this.type  = type;
          this.id = id;
       }
     }
  }
</script>

