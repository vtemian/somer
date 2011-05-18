var http = require('http'), 
    io = require('./socket.io'),
    sys = require('sys'),
    url = require('url');
chatroom = function (id1){
    this.id=id1;
    this.users = [];
}
chatroom.prototype.addUser=function (client){
                                this.users.push(client);
                            };
chatroom.prototype.scoate_id=function (){
                                return this.id;
                            };
chatroom.prototype.scoate_user=function (){
                                return this.users;
                            };
var nume;
var rooms = [];
user_room="";
var id_camera="4";
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
        case '/creare-room':
            res.writeHead(200, {'Content-Type': 'text/html'});
            id_camera = url.parse(req.url,true).query["id"];
            room = new chatroom(id_camera);
            rooms.push(room);
            res.end("OK");
            break;
    }


});
server.listen(8080);
rooms.push(new chatroom("4"));

var rooms_id=[];
rooms_id.push("4");


var socket = io.listen(server);

socket.on('connection', function(client){
  var index=rooms_id.indexOf(user_room);
  var room=rooms[index];
  room.addUser(client);
  sys.puts("ok");
  client.on('message', function(message){
      var msg = { message: user_room };
      var users =  room.scoate_user();
      for(var i in users)
          users[i].send(msg);
  });

  //client.on('disconnect', function(){ alert('disconect'); })
});