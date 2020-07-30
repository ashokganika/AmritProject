var fs= require('fs');
function write(fileName,content,ab){
    fs.writeFile(fileName,content,function(err,done){
    if(err){
ab(err);
    }
    else{
        ab(null,done);

    }
})}
module.exports={
    write 
}