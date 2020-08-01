var db = require('./databaseConfig');

var offersDB = {

  // Task 11: GET --> Retrieves all offers of a listing
  getOffersByListings: function (listing_id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) { // database connection got issue!
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "select * from offers where fk_listing_id = ?"

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

  // Task 12: POST --> Adds an offer for that listing. A user can send more than one offer for the same listing.
  postOffersByListings: function (offer, fk_offeror_id, listingid, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "insert into offers(offer,fk_offeror_id,fk_listing_id) values(?,?,?)";

        dbConn.query(sql, [offer, fk_offeror_id, listingid], function (err, result) {
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

  // CA2 : GET --> Retrieves all offers that id recieved
  getOffersByUser: function (id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {
        console.log(err);
        return callback(err, null);
      } else {

        var sql = "SELECT u.username, o.offer, l.title FROM users u, offers o, listings l WHERE o.fk_listing_id = l.id and o.fk_offeror_id = u.id and l.fk_poster_id = ?"

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

}

module.exports = offersDB;