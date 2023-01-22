var http = require('http');
var app = require('./app')
var server = http.createServer(app);

server.listen('4000', ()=>{
    console.log('App is listening on port no. 4000')
})