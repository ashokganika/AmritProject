const express=require('express');
const app = express();
var port=2021;
// app.get('/',function(err,done){

// })
app.get('/write',function(req,res){
    require('fs').writeFile('kot.txt','hey',function(err,done){
        if(err){
            res.send('write  failure');
        }
        else{
            res.send('write success');
        }
    })
})

app.get('/read',function(req,res){
    require('fs').readFile('ktm.txt',function(err,done){
        if(err){
            res.send('read failure');
        }
        else{
            res.send('read success');
        }
    })
})
app.get('/rename',function(req,res){
    require('fs').rename('./npj.txt','./npj-new.txt',function(err,done){
        if(err){
            res.send('rename failure');
        }
        else{
            res.send('rename success');
        }
    })
})
app.get('/remove',function(req,res){
    require('fs').unlink('kot.txt',function(err,done){
        if(err){
            res.send('not remove');
        }
        else{
            res.send('remove');
        }
    })
})
app.listen(port,function(err,done){
if(err){
    console.log('error');
}
else{
    console.log('app listen at port ' + port);
}
});