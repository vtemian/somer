$('document').ready(function(){
    var socket = new io.Socket('192.168.43.62',{port:8080});
    var nickname;

    $('#chat-submit').click(function(){
        socket.connect();
        socket.on('message', function(data){
             $('#chat').append(data+'<br/>');
        });
       nickname = $('#chat-room').val();

    });

    $('#trimite').click(function(){
        val = $('#text').val();
        if(val.trim() != ""){
             message = nickname + ": " + val;
             socket.send(message);
             $('#chat').append(message+'<br/>');
             $('#text').val("");
        }

     });
})
