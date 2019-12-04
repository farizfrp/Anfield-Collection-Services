var http = require('http');
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

 //await connectDB()
 res.send('connected');
   
})
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    res.end("");
});
server.listen(80);