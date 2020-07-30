const express=require('express');
const app = express();
var port=2021;
const morgan=require('morgan');

app.get('/',function(err,done){
   
})
app.use(function(req,res,next){
    console.log('i am middleware');
    next();
})
// app.use(morgan('dev'));
app.use('/help',function(req,res,next){
    res.json({
        msg:'hi',
    })
})
// app.use(morgan('dev'));
    app.get('/pass/:name/:content',function(req,res,next){
        res.json({
            params: 
            req.params,
           query:req.query,
           
           
        })
    })
    app.use(morgan('dev'));
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

app.use(function(req,res,next){
    console.log('i am 2middleware');  
    res.json({
        msg:'you are blocked at 2middleware'
        
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