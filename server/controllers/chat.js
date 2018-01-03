
const Chat = require('../models/chat')




//socket 应用
const socket = async function(socket){

    socket.join(socket.id);
    console.log('--------一个用户连接上了--------');
    let users = {},
        usocket = {};
    console.log(socket.id)
    //发送socketid到用户端
    this.emit('getId',socket.id);


    socket.on('sendMsg', async (data) =>{

        console.log(data)
        let r =  await Chat.insertChat({
            id:Math.random().toString(16).substr(2)+Math.random().toString(16).substr(2),
            uid:data.id,
            username:data.username,
            msg:data.msg,
            create_time:(new Date()).getTime(),
        });

        if ( r && r.insertid ) {
            this.emit('sendRoomMsg',data);

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
