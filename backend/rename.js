const fs=require('fs');

fs.rename('./ktm.txt','./ktm-new.txt',function(err,done){
    if(err){
        console.log('error in rename>>',err);
    }
    else{
        console.log('success in rename',done);
    }
});
console.log('rename success');

