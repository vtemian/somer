var http = require('http'), 
    io = require('./socket.io'),
    sys = require('sys'),
    url = require('url');
chatroom = function (id1){
    this.id=id1;
    this.users = [];
    this.nume = [];
    this.admin="";
}
chatroom.prototype.addUser=function (client,nume){
                                this.users.push(client);
                                this.nume.push(nume);
                            };
chatroom.prototype.addAdmin=function (admin){
                                this.admin=admin;
                            };
chatroom.prototype.scoate_id=function (){
                                return this.id;
                            };
chatroom.prototype.scoate_user=function (){
                                return this.users;
                            };
chatroom.prototype.scoate_nume=function (){
                                return this.nume;
                            };
chatroom.prototype.scoate_admin=function (){
                                return this.admin;
                            };
chatroom.prototype.scoate_utilizator=function (index){
                                return this.users[index];
                            };
var nume;
var rooms = [];
user_room="";
var id_camera="4";
var rooms_id=[];

server = http.createServer(function(req, res){
    pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/index.html':
            var body= '_testcb(\'{"message": "Hello world!"}\')';
            res.writeHead(200, {
                          'Content-Type': 'text/plain' });
            user_room=url.parse(req.url,true).query["id"];
            sys.puts(user_room);
            res.end('_testcb(\'{"message": "Hello world!"}\')');
            break;
         case '/distrugere-room':
            var body= '_testcb(\'{"message": "Hello world!"}\')';
            res.writeHead(200, {
                          'Content-Type': 'text/plain' });
            id_camera = url.parse(req.url,true).query["id"];
            var index=rooms_id.indexOf(id_camera);
            rooms[index]=null;
            rooms_id[index]=0;
            res.end('_testcb(\'{"message": "Hello world!"}\')');
            break;
        case '/creare-room':
            res.writeHead(200, {'Content-Type': 'text/html'});
            id_camera = url.parse(req.url,true).query["id"];
            var index=rooms_id.indexOf(id_camera);
                user_room=id_camera;
            if(index==-1){
                room = new chatroom(id_camera);
                rooms.push(room);
                rooms_id.push(id_camera);
            }
            res.end('_testcb(\'{"message": "Hello world!"}\')');
            break;
    }


});
server.listen(8080);
var socket = io.listen(server);

socket.on('connection', function(client){
  var index=rooms_id.indexOf(user_room);
  var room=rooms[index];
  client.on('message', function(message){
      if(message.conectat!=""){

          client.send({tot:room.scoate_nume()});
          if(message.admin=="da")
            room.addAdmin(message.conectat);
          var msg = { nou:message.conectat };
          var users =  room.scoate_user();

          for(var i in users)
              users[i].send(msg);
          room.addUser(client,message.conectat);
      }else
      if(message.invitatie!=""){
          sys.puts(room.scoate_admin());
          var user_nume=room.scoate_nume();
          index = user_nume.indexOf(message.invitatie);
          var client1=room.scoate_utilizator(index);
          client1.send({invitatie:room.scoate_admin()});
      }else
      if(message.sterge!=""){
          var msg = { sterge:message.sterge };
          var users =  room.scoate_user();
          for(var i in users)
              users[i].send(msg);
      }else
      if(message.loser!=""){
         sys.puts("crash")
          var msg = { sterge:"sterge" };
          var users =  room.scoate_user();
          for(var i in users)
              users[i].send(msg);
      }else
      {
          sys.puts(message.mesaj);
          var msg = { messag: message.mesaj,user:message.user };
          var users =  room.scoate_user();
          for(var i in users)
              users[i].send(msg);
      }
  });

  //client.on('disconnect', function(){ alert('disconect'); })
});