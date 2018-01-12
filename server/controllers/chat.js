
const Chat = require('../models/chat')
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

        let isExit = await Room.isExitOne(data.id);
        let roomId = 'r00001';
        let room = [];
        if(isExit.length>0){

            room =  await Room.findRoomById(data.id);

        }else{
            room = [
                {
                    uid:data.id,
                    roomId:roomId,
                    roomName:'大厅'
                }
            ]
          let insertResult =  await Room.insertRoom(room[0])
            console.log(insertResult)

        }

        if(room){


            let result = await Chat.findChatByRoomId(room[0].roomId);

            console.log(result)

            this.emit('getRoomId',room);

            let r = {};
            r[room[0].roomId] = result

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
            rid:data.roomId||'0001', //默认大厅的roomId是0001
            username:data.username,
            msg:data.msg,
            create_time:new Date(),
        };

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
