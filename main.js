var http = require('http');
require('dotenv').config();
var url = require('url');
var io = require('socket.io');
var fs = require('fs');
var MyModel = require('./Employee');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local_demo');


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
                //errors: Send the response body 
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
    socket.on("chat", function (message) {
        console.log(message);
        socket.broadcast.emit("chat", message);
    });


});


var employee = MyModel({
    first_name: 'Johan',
    last_name: 'GOGs',
    ID: 'Cue-865',
    designation: 'SSE'
});

// save the user
employee.save(function (err) {
    if (!err) {
        console.log('User created!');
    } else {
        console.log(err.errors);
    }
});


MyModel.find({ first_name: 'Johan' }, function (err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
});

MyModel.findOneAndUpdate({ first_name: 'Johan' }, { first_name: 'Peter' }, function (err, user) {
    if (err) throw err;

    // we have the updated user returned to us
    console.log(user);
});


MyModel.find({ first_name: 'Peter' }, function (err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
});

MyModel.findOneAndRemove({ first_name: 'Peter' }, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});



MyModel.find({ first_name: 'Peter' }, function (err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
});