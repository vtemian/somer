var admin=false;
var privat="";
var socket;
function deschide_chat(link){
    var data=[];
    var id_link=link.attr('id');
    $('#chat-display').val("");
    data["id"]=link.attr('id');
    $('#home').animate( {marginTop: "-510px"},
                                     {
                                         step: function(){$('#chat').css("display","block");},
                                         complete: function(){
                                             $.post('/api/job/scoate_chat',{id:link.attr('id')},function(response){
                                                 $('#job','#chat').append('<h2>'+response[0].Titlu+'</h2>'+'<h3>'+response[0].Descriere+'</h3>');
                                                 $.post('/api/job/scoate_chat_user',{id:response[0].id},function(response){
                                                     if(response=="ok"){
                                                         var url='http://localhost:8080/creare-room';
                                                         admin=true;
                                                         $('#job','#chat').append('<div id="accepta">Angajeaza!</div>');
                                                         $('#accepta').click(function(){
                                                             if(privat!=""){
                                                                 alert('Felicitari!\n'+privat+' este noua persoana angajata!');
                                                                 socket.send({conectat:"",invitatie:"",sterge:privat,loser:""});

                                                                 $id=id_link;
                                                                $.ajax({
                                                                               url: 'http://localhost:8080/distrugere-room',
                                                                               type: "GET",
                                                                               dataType: "jsonp",
                                                                               data: "id="+$id,
                                                                               jsonpCallback: "_testcb",
                                                                               cache: false,
                                                                               timeout: 5000,
                                                                                success: function(data) {
                                                                                      $.post('/api/job/kill_room',{id:link.attr('id')},function(){
                                                                                         alert('Job sters');
                                                                                          window.location="";
                                                                                      });
                                                                                }
                                                                        });
                                                               }else{
                                                                    alert('Trebuie sa selectati o persoana mai intai!');
                                                                }
                                                         });


                                                     }else{
                                                         var url='http://localhost:8080/index.html';
                                                         admin=false;
                                                     }

                                                        //conectare la server
                                                                $id=link.attr('id');
                                                                $.ajax({
                                                                               url: url,
                                                                               type: "GET",
                                                                               dataType: "jsonp",
                                                                               data: "id="+$id,
                                                                               jsonpCallback: "_testcb",
                                                                               cache: false,
                                                                               timeout: 5000,
                                                                                success: function(data) {

                                                                                   socket = new io.Socket('localhost',{port:8080});
                                                                                    socket.connect();
                                                                                    
                                                                                    socket.on('connect',function(data){
                                                                                     
                                                                                        if(admin)
                                                                                            socket.send({conectat:nume+' '+prenume,admin:"da",sterge:""});
                                                                                        else
                                                                                            socket.send({conectat:nume+' '+prenume,admin:"nu",sterge:""});
                                                                                    });
                                                                                    socket.on('message', function(data){
                                                                                        if(data.tot){
                                                                                            $('#users-online').append('<div id="user-chat">'+nume+' '+prenume+'</div>');
                                                                                             $('div#user-chat').click(invitatie);
                                                                                            $.each(data.tot,function(i){
                                                                                                 $('#users-online').append('<div id="user-chat">'+data.tot[i]+'</div>');
                                                                                                 $('div#user-chat').click(invitatie);
                                                                                             });
                                                                                        }else
                                                                                        if(data.nou){
                                                                                            $('#users-online').append('<div id="user-chat">'+data.nou+'</div>');
                                                                                            $('div#user-chat').click(invitatie);
                                                                                        }else{
                                                                                            if(data.invitatie){
                                                                                                privat=data.invitatie;
                                                                                                 $('#privat').empty();
                                                                                                 $('#privat').append(privat);
                                                                                            }else
                                                                                            if(data.sterge){
                                                                                                alert('Interviul a luat sfarsit!\n'+data.sterge+' a fost acceptat');
                                                                                                window.location="";
                                                                                            }else
                                                                                            if(privat==""||privat==data.user||data.user==nume+' '+prenume)
                                                                                                $('#chat-display').val(data.user+': '+data.messag+"\n"+$('#chat-display').val());
                                                                                            
                                                                                        }
                                                                                    });
                                                                                     $('#div-scris').click(function(){
                                                                                         
                                                                                         if($('#scris').val()!=""){
                                                                                             socket.send({user:nume+' '+prenume,mesaj:$('#scris').val(),conectat:"",invitatie:"",sterge:""});
                                                                                             $('#scris').val("");
                                                                                         }
                                                                                     });
                                                                                    //invitatie privat

                                                                                }

                                                                           });
                                                         });
                                                 }) ;

                                         }
                                     }
                       );

}
function invitatie(){
      if(admin){
         socket.send({conectat:"",invitatie:$(this).text(),sterge:""});
         privat=$(this).text();
         $('#privat').empty();
         $('#privat').append(privat);
     }
}
function open_chat(id_job){
    $.post('/api/job/scoate_chat_user',{id:id_job},function(response){
           if(response=="ok"){
               var url='http://localhost:8080/creare-room';
               admin=true;
               $('#job','#chat').append('<div id="accepta">Angajeaza!</div>');
               $('#accepta').click(function(){
                   if(privat!=""){
                      alert('Felicitari!\n'+privat+' este noua persoana angajata!');
                      socket.send({conectat:"",invitatie:"",sterge:privat,loser:""});
                      $id=id_job;
                      $.ajax({
                           url: 'http://localhost:8080/distrugere-room',
                           type: "GET",
                           dataType: "jsonp",
                           data: "id="+$id,
                           jsonpCallback: "_testcb",
                           cache: false,
                           timeout: 5000,
                           success: function(data) {
                               $.post('/api/job/kill_room',{id:id_job},function(){
                                         alert('Job sters');
                                         window.location="/";
                               });
                           }
                      });
                   }else{
                      alert('Trebuie sa selectati o persoana mai intai!');
                   }
                });


           }else{
               var url='http://localhost:8080/index.html';
               admin=false;}


                                                        //conectare la server
                                                                $id=id_job;
                                                                $.ajax({
                                                                               url: url,
                                                                               type: "GET",
                                                                               dataType: "jsonp",
                                                                               data: "id="+$id,
                                                                               jsonpCallback: "_testcb",
                                                                               cache: false,
                                                                               timeout: 5000,
                                                                                success: function(data) {

                                                                                   socket = new io.Socket('localhost',{port:8080});
                                                                                    socket.connect();

                                                                                    socket.on('connect',function(data){

                                                                                        if(admin)
                                                                                            socket.send({conectat:nume+' '+prenume,admin:"da",sterge:"",loser:""});
                                                                                        else
                                                                                            socket.send({conectat:nume+' '+prenume,admin:"nu",sterge:"",loser:""});
                                                                                    });
                                                                                    socket.on('message', function(data){
                                                                                        
                                                                                        if(data.tot){
                                                                                            $('#users-online').append('<div id="user-chat">'+nume+' '+prenume+'</div>');
                                                                                             $('div#user-chat').click(invitatie);
                                                                                            $.each(data.tot,function(i){
                                                                                                 $('#users-online').append('<div id="user-chat">'+data.tot[i]+'</div>');
                                                                                                 $('div#user-chat').click(invitatie);
                                                                                             });
                                                                                        }else
                                                                                        if(data.nou){
                                                                                            $('#users-online').append('<div id="user-chat">'+data.nou+'</div>');
                                                                                            $('div#user-chat').click(invitatie);
                                                                                        }else{
                                                                                            if(data.invitatie){
                                                                                                privat=data.invitatie;
                                                                                                 $('#privat').empty();
                                                                                                 $('#privat').append(privat);
                                                                                            }else
                                                                                            if(data.sterge){
                                                                                                alert('Interviul a luat sfarsit!\n'+data.sterge+' a fost acceptat');
                                                                                                window.location="/";
                                                                                            }else
                                                                                            if(privat==""||privat==data.user||data.user==nume+' '+prenume)
                                                                                                $('#chat-display').val(data.user+': '+data.messag+"\n"+$('#chat-display').val());

                                                                                        }
                                                                                    });
                                                                                     $('#div-scris').click(function(){

                                                                                         if($('#scris').val()!=""){
                                                                                             if($('#scris').val()=="loser"&&loser)
                                                                                                socket.send({user:nume+' '+prenume,mesaj:"",conectat:"",invitatie:"",sterge:"",loser:"loser"});
                                                                                             socket.send({user:nume+' '+prenume,mesaj:$('#scris').val(),conectat:"",invitatie:"",sterge:"",loser:""});
                                                                                             $('#scris').val("");
                                                                                         }
                                                                                     });
                                                                                    //invitatie privat

                                                                                }

                                                                           });
                                                        
                                                 }) ;
}
function accepta_job(link){

}