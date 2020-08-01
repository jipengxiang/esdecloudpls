// Name: Malcom Tan Yon Kiak
// Admin Number: P1936083
// Class: DIT/FT/1B/12  

const express=require('express');
const serveStatic=require('serve-static');


var hostname="ec2-54-90-35-86.compute-1.amazonaws.com";
var port=3001;


var app=express();


app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);

    if(req.method!="GET"){
        res.type('.html');
        var msg="<html><body>This server only serves web pages with GET!</body></html>";
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});


app.listen(port,hostname,function(){

    console.log(`Server hosted at http://${hostname}:${port}`);
});