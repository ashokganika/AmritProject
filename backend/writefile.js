const fs = require('fs');
fs.writeFile('ktm.txt','welcome to node js',function(err,done){
if(err)
{
    console.log('err in writing file>>',err);
}
else{
    console.log('success in writing a file>>',done);
}
});
console.log('file writing success');

