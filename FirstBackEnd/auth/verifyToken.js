var jwt = require('jsonwebtoken');
var config = require('../config');


// MiddleWare
var checker = {

    verifyToken:function(req,res,next){
        var token = req.headers['authorization'];
        if(token==null || !token.includes('Bearer ')){
            res.status(403);
            res.send(`{"Result":"Not Authorized"}`);
        }else{
            token=token.split('Bearer ')[1];
            console.log(token);
            jwt.verify(token,config.key,function(err,decoded){
                if(err){
                   res.status(403);
                   res.send(`{"Result":"Not Authorized"}`);
                }
                else{
                    req.userid=decoded.userid;
                    req.username=decoded.username;
                    next();
                }
            });
        }
    },
}
module.exports=checker;