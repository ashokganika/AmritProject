const fs=require('fs');
fs.unlink('./ktm-new.txt',function(err,done){
    if(err){
        console.log(' text not remove');
    }
    else{
        console.log('text remove ');
    }
})