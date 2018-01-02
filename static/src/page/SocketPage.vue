<template>
   <div class="g-socket">
     <h1 class="title has-text-centered">socket的demo</h1>

     <div class="g-main">
       <div class="columns is-desktop">
         <div class="column is-one-quarter c-list ">
           <ul>
             <li v-for="(item,key) in talkList" :key="key" :class="{active:active==key}"  @click="sel(key,item.id)">
               <p >{{item.name}}</p>
             </li>

           </ul>
         </div>
         <div class="column c-msg " >
           <!--<ul  v-for="(item,key) in talkList" :key="key"  v-if="active==key">-->
             <!--<li v-for="i in allMsg[item]" @click="talkTo(i.id,i.user)">{{i.id}} {{i.user}}:{{i.msg}}</li>-->
           <!--</ul>-->
           <ul v-for="i in allMsg" >
           <li @click="talkTo(i.id,i.user)">{{i.id}} {{i.user}}:{{i.msg}}</li>
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
  .c-msg li {
    cursor: pointer;
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
       active:0,
       talkList:[
         {
           name:'大厅',
           id:''
         }
       ],
       sId:'',
       type:'room',
       id:'001'
     }
    },
     computed:{
       user (){
           return this.$store.getters.getUserInfo.username
       },

     },
     mounted(){

       socket.on('sendRoomMsg',  (data) =>{

         this.allMsg.push(data);

       });

       socket.on('getId',  (id) =>{

         this.sId = id;
       });
       socket.on('message',  (data) =>{

          console.log(data)

       });
     },
     methods:{
        sendMsg(){
          console.log(this.sId);
          socket.emit('sendMsg', {
              id:this.sId,
              msg:this.msg,
              user:this.user
          });
          this.msg = ''
        },
       /**
        * 私聊
        * @param id
        * @param useName
        */
       talkTo(id,useName){
        this.talkList.push({
          id,
          name:useName
        });

        this.active = this.talkList.length-1;
         socket.emit('tallToSomeOne', {
           id:id,
           msg:'hello',
           user:this.user
         });
       },
       sel(key,type,id){
          this.active = key;
          this.type  = type;
          this.id = id;
       }
     }
  }
</script>

