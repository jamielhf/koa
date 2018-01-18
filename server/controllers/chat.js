
const Chat = require('../models/chat')
const User_room = require('../models/user_room')
const Room = require('../models/room')

const {dateFormat} =  require('../utils/util')


//socket 应用
const socket = async function(socket){

    socket.join(socket.id);
    //初始化链接
    socket.on('userConnect', async (data) =>{
        console.log('--------一个用户连接上了--------');
        console.log(data)
        //判断是否已经存在初始的对应关系，不存在就新增一天对应关系

        let roomList = await User_room.roomList(data.id); //该用户的对话房间

        let roomId = 'r00001';
        let room = [];
        if(roomList.length==0){
          roomList = [
            {
              uid:data.id,
              roomId:roomId,
              roomName:'大厅'
            }
          ]
          let insertResult =  await User_room.insertRoom(roomList[0])
          console.log(insertResult)
        }

        if(roomList){
          let result = await Chat.findChatByRoomId(roomList);

          this.emit('getRoomId',roomList);

          let r = {};
          r[roomList[0].roomId] = result

          this.emit('getAllMsg',r);
        }








    })


    //发送socketid到用户端
    this.emit('getId',socket.id);


    socket.on('sendMsg', async (data) =>{

        console.log(data);
          let m  = {
            id:Math.random().toString(16).substr(2)+Math.random().toString(16).substr(2),//消息的id
            uid:data.id,
            rid:data.roomId||'r00001', //默认大厅的roomId是r00001
            username:data.username,
            msg:data.msg,
            create_time:new Date(),
          };
        if(data.type=='personal'){

            if(data.roomId.indexOf('copy')>=0){ //暂时的roomid

            }

        }


        let r =  await Chat.insertChat(m);

        //保存数据后发送到客户端

        if ( r && typeof(r.insertId)=='number') {

            this.emit('sendRoomMsg',m);

        } else {

        }


    });


    socket.on('tallToSomeOne', (data) =>{
        socket.join(data.id);
        console.log('--------加入了房间'+data.id+'--------');
        this.to(data.id).emit('message', data.msg);


        // if( data.roomId){
        //     console.log('--------加入了房间room'+data.roomId+'--------');
        //     socket.join('room'+data.roomId);
        // }

        // socket.to('room').emit('roomMsg',{
        //     msg:data.msg
        // });

        // usocket[id] = socket;

    })




    socket.on('disconnect', function() {
        console.log('--------一个用户断开了连接--------');
    });

}

module.exports = socket
