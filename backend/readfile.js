const fs=require('fs');
fs.readFile('ktm.txt',function(err,done){
    if(err){
        console.log('err',err);
    }
    else{
        console.log('success',done.toString());
    }
})