const fs =require('fs');
function read(fileName,ab){
    fs.readFile(fileName,'UTF-8',function(err,done){
    if(err){
ab(err,null);
    }
    else{
ab(null,done)
    }
})}
read('npj.txt',function(err,done){
    if(err){
        console.log('reading failure>>',err);
    }
    else{
        console.log('reading success>>',done);
    }
});
console.log('reading success');