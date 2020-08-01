var db = require('./databaseConfig');

var listingsDB = {

  // Task 5: GET --> Retrieves all listings of a given user
  getListingsByUsers: function (user_id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) { // database connection got issue!
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "select * from listings where fk_poster_id=?";

        dbConn.query(sql, [user_id], function (err, result) {
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

  // Task 6: GET --> Get all listings in the database
  getListings: function (callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "select * from listings";
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

  // Task 7: GET --> Retrieves a single listing by its id
  getIDListings: function (listing_id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "select * from listings where id=?";

        dbConn.query(sql, [listing_id], function (err, result) {
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

  // Task 8: POST --> Used to add a new listing to the database
  insertListings: function (title, description, price, image,poster_id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "insert into listings(title,description,price,image,fk_poster_id) values(?,?,?,?,?)";

        dbConn.query(sql, [title, description, price, image,poster_id], function (err, result) {
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

  // Task 9: DELETE --> Deletes a listing given it’s id. Idempotent.
  deleteListing: function (id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "delete from listings where id=?";

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

  // Task 10: PUT --> Updates a listing. 
  updateListings: function (title, description, price, id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "update listings set title=?, description=?, price=? where id=?";

        dbConn.query(sql, [title, description, price, id], function (err, result) {
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


  // CA2 : GET --> title
  getTitle: function (title, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "SELECT * FROM listings WHERE title LIKE '%" + title + "%'";
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

}

module.exports = listingsDB;