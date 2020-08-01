// Name: Malcom Tan Yon Kiak
// Admin number: P1936083
// Class: DIT/FT/1B/12

var app=require('./controller/app.js');
var port=8081;


var server=app.listen(port,function(){

    console.log("App hosted at localhost:"+port);
});