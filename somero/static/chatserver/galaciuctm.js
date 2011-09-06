var http = require('http'), 
    io = require('./socket.io'),
    sys = require('sys'),
    url = require('url');

server = http.createServer(function(req, res){
     var body= '_testcb(\'{"message": "Hello world!"}\')';
    res.writeHead(200, {
                  'Content-Type': 'text/plain' });
    res.end('_testcb(\'{"message": "Hello world!"}\')');

});
server.listen(8080);
var socket = io.listen(server);

socket.on('connection', function(client){
    sys.puts("aaaaahhhh");
  client.on('message', function(message){
        client.broadcast(message);
         sys.puts(message);
//          var msg = { messag: message.mesaj,user:message.user };
//          var users =  room.scoate_user();
//          for(var i in users)
//              users[i].send(msg);

  });
});