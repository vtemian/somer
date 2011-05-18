    $('document').ready(function(){
        $('#chat-submit').click(function(){
            $id=$('#chat-room').val();
            $.ajax({
                           url: 'http://localhost:8080/index.html',
                           type: "GET",
                           dataType: "jsonp",
                           data: "id="+$id,
                           jsonpCallback: "_testcb",
                           cache: false,
                           timeout: 5000,
                            success: function(data) {
                               var socket = new io.Socket('localhost',{port:8080});
                                socket.connect();
                                socket.on('message', function(data){
                                     $('#chat').append(data.message+'<br/>');
                                });
                                 $('#trimite').click(function(){
                                     socket.send($('#text').val());
                                     $('#text').val("");
                                 });
                            }

                       });

        });

    })
