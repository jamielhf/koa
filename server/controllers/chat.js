
const Chat = require('../models/chat')
const User_room = require('../models/user_room')
const Room = require('../models/room')

const {dateFormat} =  require('../utils/util')


//socket 应用
const socket = async function(socket){


    //初始化链接
    socket.on('userConnect', async (data) =>{
        console.log('--------一个用户连接上了--------');

        console.log(data)
        //判断是否已经存在初始的对应关系，不存在就新增一天对应关系
        socket.join(data.id);

        let roomList = await User_room.roomList(data.id); //该用户的对话房间

        let roomId = 'r00001';
        let room = [];
        if(roomList.length==0){
          roomList = [
            {
              uid:data.id,
              roomId:roomId,
              roomName:'大厅',
              type:'group'
            }
          ]
          let insertResult =  await User_room.insertRoom(roomList[0])

        }

        if(roomList){
          let result = await Chat.findChatByRoomId(roomList);

          roomList.map((i,k)=>{
            if(i.roomId!='r00001'){
              socket.join(i.roomId);
            }
          });
          this.to(data.id).emit('getRoomId',roomList);
          // this.emit('getRoomId',roomList);

          let r = {};
          roomList.map((i,k)=>{
            result.map((item,key)=>{
              if(item.rId == i.roomId){
                if(r[i.roomId] == undefined){
                  r[i.roomId] = [];
                }
                  r[i.roomId].push(item)

              }
            })
          });
          this.to(data.id).emit('getAllMsg',r);
          // this.emit('getAllMsg',r);
        }


    })


    //发送socketid到用户端
    this.emit('getId',socket.id);


    socket.on('sendMsg', async (data) =>{

          let m  = {
            id:Math.random().toString(16).substr(2)+Math.random().toString(16).substr(2),//消息的id
            uid:data.id,
            rid:data.roomId||'r00001', //默认大厅的roomId是r00001
            username:data.username,
            msg:data.msg,
            create_time:new Date(),
          };

          console.log(data)

        if(data.type=='personal'){

            if(data.roomId.indexOf('copy')>=0){ //暂时的roomid
                let roomId = 'r'+Math.random().toString(16).substr(2);
              m.rid = roomId;
              let r =  {
                uid:data.id,
                roomId,
                type:'personal',
                roomName:data.toUsername,
              };
              let r2 =  {
                uid:data.toUserId,
                roomId,
                type:'personal',
                roomName:data.username,
              };

              let insertChatR =  await Chat.insertChat(m);

              //新增聊天的人的房间
              let insertResult2 =  await User_room.insertRoom(r2);
              if(typeof(insertResult2.insertId)=='number'&&insertChatR){

                let roomList = await User_room.roomList(data.toUserId); //该用户的对话房间

                let result = await Chat.findChatByRoomId(roomList);
                let r = {};
                roomList.map((i,k)=>{
                  socket.join(i.roomId);
                  result.map((item,key)=>{
                    if(item.rId == i.roomId){
                      if(r[i.roomId] == undefined){
                        r[i.roomId] = [];
                      }
                      r[i.roomId].push(item)
                    }
                  })
                });

                this.emit(data.toUserId,{
                  roomList,
                  msg:r
                });

                // let roomList = await User_room.roomList(data.toUserId); //该用户的对话房间
                // this.to(data.id).emit('reGetRoomList', m);
              }

            //新增自己的房间
              let insertResult1 =  await User_room.insertRoom(r);
              if(typeof(insertResult1.insertId)=='number'){
                let roomList = await User_room.roomList(data.id); //该用户的对话房间
                if(roomList.length>0){

                  // this.to(data.id).emit('getRoomId',roomList);



                  let result = await Chat.findChatByRoomId(roomList);
                  let r = {};
                  roomList.map((i,k)=>{
                    socket.join(i.roomId);
                    result.map((item,key)=>{
                      if(item.rId == i.roomId){
                        if(r[i.roomId] == undefined){
                          r[i.roomId] = [];
                        }
                        r[i.roomId].push(item)
                      }
                    })
                  });
                  if(insertChatR){
                    this.emit(data.id,{
                      roomList,
                      msg:r
                    });
                  }


                  // if ( insertChatR && typeof(insertChatR.insertId)=='number') {
                  //   m.toUsername = data.toUsername;
                  //   m.toUserId = data.toUserId;
                  //
                  //   this.to(roomId).emit('personalMsg', m);
                  // }

                }
              }




            }else{

              let insertChatR =  await Chat.insertChat(m);
              m.toUsername = data.toUsername;
              m.toUserId = data.toUserId;
              console.log(111,m)
              if ( insertChatR && typeof(insertChatR.insertId)=='number') {
                this.to(m.rid).emit('personalMsg', m);
              }


            }

        }else{

          console.log(data.roomId)

          let r =  await Chat.insertChat(m);

          //保存数据后发送到客户端

          if ( r && typeof(r.insertId)=='number') {

            this.emit('sendRoomMsg',m);

          } else {

          }
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
