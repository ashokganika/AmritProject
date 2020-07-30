 const http = require('http');
 var server = http.createServer(function(request,response){
     console.log('client connected to the server');
     console.log('request',request);
     response.end('welcome to the server');
     
 });
 server.listen(9090,function(err,done){
     if(err){
         console.log('server has not been created');

     }
     else{
         console.log('server has been created');
         console.log('press ctrl + c to exist');
     }
 });
console.log('server listening at port 9090');