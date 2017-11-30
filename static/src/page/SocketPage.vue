<template>
   <div class="g-index">

     <input type="text" v-model="msg">
     <a @click="sendMsg">发送内容</a>
     <div  v-for="item in allMsg">
       <p>{{item}}</p>
     </div>
   </div>
</template>

<script>
import api from '../api/api'
const socket = io.connect('http://localhost:3009');
   export default {
    components: {

    },
    data () {
     return {
       msg:'',
       allMsg:[]
     }
    },
     mounted(){

       socket.on('allMsg',  (data) =>{
         console.log(data)
         this.allMsg.push(data)
       });


     },
     methods:{
        sendMsg(){
          socket.emit('sendMsg', this.msg);
        }
     }
  }
</script>

