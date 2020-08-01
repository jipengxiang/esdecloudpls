var db = require('./databaseConfig');
var jwt = require('jsonwebtoken');
var config = require('../config');
var bcrypt = require('bcryptjs');

var usersDB = {

  // Task 1: GET --> Getting all users in table
  getUsers: function (callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "select * from users";

        dbConn.query(sql, [], function (err, result) {
          dbConn.end();
          if (err) {
            console.log(err)
            return callback(err, null);
          } else
            return callback(null, result);
        });
      }
    });
  },

  // Task 2: POST --> Used to add a new user to the database
  insertUsers: function (username, profile_pic_url, password, callback) {

    var dbconn = db.getConnection();

    dbconn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        console.log("Connected!");
        sqlStr = `Insert into users(username,profile_pic_url,password) values('${username}','${profile_pic_url}','${password}')`;
        dbconn.query(sqlStr, [], function (err, result) {
          dbconn.end();

          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });

      }
    });
  },

  // Task 3: GET --> Retrieve a single user by their id
  getIDUsers: function (id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "select * from users where id=?";

        dbConn.query(sql, [id], function (err, result) {
          dbConn.end();
          if (err) {
            console.log(err)
            return callback(err, null);
          } else
            return callback(null, result);
        });
      }
    });
  },

  // Task 4: PUT --> Update a single user. ID and created timestamp should not be updatable.
  updateUsername: function (username, id, callback) { // returns a callback 
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = `update users set username='${username}' where id='${id}'`;

        dbConn.query(sql, [], function (err, result) {
          dbConn.end();
          if (err) {
            console.log(err)
            return callback(err, null);
          } else
            return callback(null, result);
        });
      }
    });
  },

  // Login
  loginUser: function (username, password, callback) {

    var dbconn = db.getConnection();

    dbconn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      else {
        console.log("Connected!");

        var sql = `select * from users where username='${username}' and password='${password}'`;

        dbconn.query(sql, [], function (err, result) {
          dbconn.end();

          if (err) {
            console.log("Err: " + err);
            return callback(err, null, null);
          } else {
            var token = "";
            var i;

            if (result.length == 1) {
              token = jwt.sign({ id: result[0].id }, config.key, {
                expiresIn: 86400 //expires in 24 hrs
              });
              console.log("@@token " + token);
              return callback(null, token, result);
            } //if(res)
            else {
              console.log("Username or Password does not match");
              var err2 = new Error("Username or Password does not match.");
              err2.statusCode = 404;
              console.log(err2);
              return callback(err2, null, null);
            }

          }

        });
      }
    });
  },

}

module.exports = usersDB;