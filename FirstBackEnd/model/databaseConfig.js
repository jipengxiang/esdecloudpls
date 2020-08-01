var mysql=require('mysql');

var dbConnect={

    getConnection:function(){
        var conn=mysql.createConnection({
            host:"esdepls.csevn4oqis2n.us-east-1.rds.amazonaws.com",
            port:3306,
            user:"admin",
            password:"Asdfghjkl1",
            database:"snapsell"
        }
        );
        return conn;
    }
}

module.exports=dbConnect;