
//socket 应用
const socket = async function(socket){

    socket.join(socket.id);
    console.log('--------一个用户连接上了--------');
    let users = {},
        usocket = {};
    console.log(socket.id)
    //发送socketid到用户端
    this.emit('getId',socket.id);


    socket.on('sendMsg',  (data) =>{
        this.emit('sendRoomMsg',data);
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
