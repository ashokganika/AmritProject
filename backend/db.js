const mongoose = require('mongoose');
const dbConfig=require('./configs/db.config');
mongoose.connect(`${dbConfig.conxnURL}/${dbConfig.dbName}`,{
    useUnifiedTopology:true,
    useNewUrlParser:true
},function(err,done){
 if(err){
     console.log('error in connectuing to db',err);
 }   
 else{
     console.log('db connection success');
 }
})

