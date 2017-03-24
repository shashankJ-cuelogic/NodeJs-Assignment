var http = require('http');
require('dotenv').config();
var url = require('url');
var io = require('socket.io');
var fs = require('fs');



var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    console.log('Server created!');
    switch (path) {
        case '/':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('hello world');
            response.end();
            break;
        case '/socket.html':
            fs.readFile(__dirname + path, function (err, data) {
                if (err) {
                    console.log(err);
                    // HTTP Status: 404 : NOT FOUND
                    // Content Type: text/plain
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                } else {
                    //Page found	  
                    // HTTP Status: 200 : OK
                    // Content Type: text/plain
                    response.writeHead(200, { 'Content-Type': 'text/html' });

                    // Write the content of the file to response body
                    response.write(data.toString());
                }
                // Send the response body 
                response.end();
            });
            break;
        default:
            response.writeHead(200, { 'Content-Type': 'text/html' });

            //response.write("opps this doesn't exist - 404");
            response.end();
    }



});

server.listen(process.env.PORT)


var listener = io.listen(server);
var clients = 0;


listener.on('connection', function (socket) {
     socket.on("chat", function(message) {
         console.log(message);
    	socket.broadcast.emit("chat", message);
    });

    
});