<template>
   <div class="g-socket">
     <h1 class="title has-text-centered">socket的demo</h1>

     <div class="g-main">
       <div class="columns is-desktop">
         <div class="column is-one-quarter c-list ">
           <ul>
             <li v-for="(item,key) in talkList" :key="key" :class="{active:active==key}"  @click="sel(key,item.roomId,item.type)">
               <p >{{item.roomName}}</p>
             </li>

           </ul>
         </div>
         <div class="column c-msg "   ref="msgBox">
           <ul ref="msgUl">
           <li  :key="k" v-for="(i,k) in allMsg[curRoomId]" @click="talkTo(i.uid,i.username,'personal')">

             <p v-if="userId!=i.uid">

               <img :src="i.head_url" v-if="i.head_url" />
               <i v-else></i>
               <span>
                 <em class="c-name">{{i.username}}</em>
                 <span class="c-chat">{{i.msg}}</span>
              </span>

             </p>
             <p v-else class="c-right ">
               <span>
                 <em class="c-name">{{i.username}}</em>
                 <span class="c-chat">{{i.msg}}</span>
              </span>

               <img :src="i.head_url" v-if="i.head_url" />
               <i v-else></i>
             </p>
           </li>
           </ul>
         </div>
       </div>
       <div class="field is-grouped">
         <div class="control is-expanded">
           <input @keydown="keydown" class="input" type="text"  placeholder="发送消息" v-model="msg">
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
  .c-name{

  }
  .c-msg li {
    cursor: pointer;
    position: relative;
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
    background: #f5f5f5;
  }
  p{
    color: #333;

    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    text-align: left;
  }
  p.c-right{
    justify-content: flex-end;
  }
  p.c-right em{
    text-align: right;
  }
  p.c-right>span{
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    text-align: left;
  }
  p.c-right i{
    margin-right: 0;
    margin-left:15px;
  }
  p.c-right .c-chat{
    background: hsl(171, 100%, 41%);
  }

  p em{
    display: inline-block;
    top:-10px;
    font-style: normal;
    position: relative;
  }
  p i{
    border-radius: 5px;
    background: #fff;
    width: 40px;
    height: 40px;
    background: url("../assets/logo.png") no-repeat;
    background-size: cover;
    display: inline-block;
    margin-right: 15px;
  }
  p .c-chat{
    display: block;
    top:-10px;
    position: relative;
    max-width: 350px;
    word-break: break-all;
    background: #fff;
    padding: 0 8px;
    line-height: 30px;
    border-radius: 5px;
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
import util from '../modules/util'
const socket = io.connect('http://localhost:3009');
   export default {
    components: {

    },
    data () {
     return {
       msg:'',
       allMsg:{},
       selMsg:[],
       active:0,
       talkList:[],
       sId:'',
       type:'group',
       curRoomId:'r00001',
       id:'r00001',
       toUsername:'',
       toUserId:'',
     }
    },

     filters: {
       timeChange: function (value) {
         if (!value) return ''
         return util.dateFormat(value,'yyyy-MM-dd hh:mm:ss')
       }
     },
     computed:{

       user (){
           return this.$store.getters.getUserInfo.username
       },
       userId (){

         return this.$store.getters.getUserInfo.userId
       },

     },

     mounted(){

       //初始连接
       socket.emit('userConnect', {
         id:this.userId,
         username:this.user
       });
      //单独的获取信息
       socket.on(this.userId,data=>{
         if(data){
            console.log('建立聊天的时候获取的消息',data)
           this.talkList = data.roomList;
           this.allMsg = data.msg;

           this.curRoomId  = this.talkList[this.active].roomId
           console.log(this.talkList[this.active].roomId)

         }
       })

      //接收发送的消息
       socket.on('sendRoomMsg',  (data) =>{

         console.log('接收到消息',data);
         if(!this.allMsg[data.rid]){
//           this.allMsg[data.rid] = [];
           this.$set(this.allMsg, data.rid, [])
         }
         this.allMsg[data.rid].push(data);

         console.log(this.allMsg)

         this.$nextTick(() =>{
           if(this.$refs.msgBox){
             let msgBox = this.$refs.msgBox,
               msgUl = this.$refs.msgUl;
             msgBox.scrollTop = msgUl.offsetHeight;
           }
         })

       });

      //初始的数据
       socket.on('getAllMsg',  (data) =>{
         console.log('详细消息数据',data)
         this.allMsg = data;
         this.$nextTick(() =>{
           if(this.$refs.msgBox){
             let msgBox = this.$refs.msgBox,
               msgUl = this.$refs.msgUl;
             msgBox.scrollTop = msgUl.offsetHeight;
           }
         })
       });

       socket.on('getId',  (id) =>{
         this.sId = id;
       });
       //获取对话列表
       socket.on('getRoomId',  (data) =>{
         console.log('列表数据',data)
         this.talkList = data

       });
      //个人对话通讯
       socket.on('personalMsg',  (data) =>{

         console.log(data)
         if(!this.allMsg[data.rid]){
           this.allMsg[data.rid] = []
         }
         this.allMsg[data.rid].push(data);
       });
     },
     methods:{
       keydown(e){
          //回车
          if(e.keyCode==13){
            this.sendMsg()
          }
       },
       //获取房间列表
       getRoomList(){
         socket.emit('getRoomList',{
           id:this.userId,
           username:this.user
         });
       },
        //发送消息
        sendMsg(){
          let m = {
            id:this.userId,
            roomId:this.curRoomId,
            msg:this.msg,
            type:this.type,
            username:this.user
          };

          if(this.type =='personal'){  //发送个人对话
            m = Object.assign(m,{
              toUsername:this.toUsername,
              toUserId:this.toUserId
            })
          }

          console.log(m)
          socket.emit('sendMsg',m);
          this.msg = ''
        },
       /**
        * 新增对话
        * @param id
        * @param useName
        * @param type
        */
       talkTo(id,useName,type){

         if(id==this.userId){
           return false
         }


         this.type = type;
         let roomId = '',isExit = false;
        //如果已经存在列表
         this.talkList.map((i,k)=>{
           if(i.roomName == useName) {
             roomId = i.roomId
             isExit =  true
           }else{
             isExit = false
           }
         })

         if(isExit){

         }else{
           roomId ='copy-'+Math.random().toString(16).substr(2);//随机创建一个id，只是暂时的roomId
           this.talkList.push({
             roomId,
             type,
             roomName:useName
           });
         }
         this.active = this.talkList.length -1;
         this.curRoomId = roomId;
         this.toUsername = useName;
         this.toUserId = id;
       },
       sel(key,id,type = 'group'){
          this.type = type;
          this.active = key;
          this.curRoomId = id;
       }
     }
  }
</script>

