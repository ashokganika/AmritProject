const fs =require('fs');
var fileop=require('./functionwrite2');

fileop.write('npj.txt','I am from nepalgunj',function(err,done){
    if(err){
        console.log('error in wrting>>',err);
    }
    else{
        console.log('success in writing file>> ',done);
    }
});
console.log('file writing success');