

var express = require('express');
var users = require('../model/users');
var listings = require('../model/listings');
var offers = require('../model/offers');
var checker = require('../auth/verifyToken');
var cors = require('cors');


var bodyParser = require('body-parser');

var app = express();

var urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.options('*', cors());
app.use(cors());
app.use(urlEncodedParser);
app.use(bodyParser.json());

// Login
app.post('/users/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  users.loginUser(username, password, function (err, token, result) {
    if (!err) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      delete result[0]['password'];
      console.log(result);
      res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' });
      res.send();
    } else {
      res.sendStatus(500);
    }
  });
});

// Logout
app.post('/users/logout', function (req, res) {
  console.log("..logging out.");
  res.clearCookie('session-id');
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, status: 'Log out successful!' });

});

// Task 1: GET --> RETRIEVE all Users
app.get('/users/', function (req, res) {

  users.getUsers(function (err, result) {

    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// Task 2: POST --> Used to add a new user to the database
app.post('/users/', function (req, res) {

  var username = req.body.username;
  var profile_pic_url = req.body.profile_pic_url;
  var password = req.body.password

  users.insertUsers(username, profile_pic_url, password, function (err, result) {
    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(201)
      res.send({ "userID": result.insertId });
    }
  });
});

// Task 3: GET --> Retrieve a single user by their id
app.get('/users/:id/', function (req, res) {

  var id = req.params.id;

  users.getIDUsers(id, function (err, result) {

    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// Task 4: PUT --> Update a single user. ID and created timestamp should not be updatable.
app.put('/users/:id/', checker.verifyToken, function (req, res) {

  var id = req.params.id;
  var username = req.body.username;

  users.updateUsername(username, id, function (err, result) {
    console.log(err);
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(422);
        res.send("Unprocessable Entity");
        return;
      }
      res.status(500).send(null);
      return;
    } else {
      res.status(204);
      // res.send(result);
      res.json({ success: true, result: result, status: 'Record updated successfully!' });
    }
  });
});

// Task 5: GET --> Retrieves all listings of a given user
app.get('/users/:user_id/listings/', function (req, res) {

  var user_id = req.params.user_id;

  listings.getListingsByUsers(user_id, function (err, result) {
    if (err) {
      res.status = 500;
      res.send(null);

    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// Task 6: GET --> Get all listings in the database
app.get('/listings/', function (req, res) {

  listings.getListings(function (err, result) {

    if (err) {
      res.status = 500;
      res.send(null);
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// Task 7: GET --> Retrieves a single listing by its id
app.get('/listings/:listing_id/', function (req, res) {

  var listing_id = req.params.listing_id;

  listings.getIDListings(listing_id, function (err, result) {

    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// Task 8: POST --> User to add a new listing to the database
app.post('/listings/', function (req, res) {

  var title = req.body.title;
  var description = req.body.description;
  var price = req.body.price;
  var poster_id = req.body.fk_poster_id;
  var image = req.body.image;

  listings.insertListings(title, description, price,image, poster_id, function (err, result) {
    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(201);
      res.send({ "listingID": result.insertId });
    }
  });
});

// Task 9: DELETE --> Deletes a listing given it’s id. Idempotent.
app.delete('/listings/:id/', function (req, res) {

  var id = req.params.id;

  listings.deleteListing(id, function (err, result) {
    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(204);
      res.send(result);
    }
  });
});

// Task 10: PUT --> Updates a listing. 
app.put('/listings/:id/', function (req, res) {

  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var price = req.body.price;

  listings.updateListings(title, description, price, id, function (err, result) {
    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(204);
      res.send(result);
    }
  });
});

// Task 11: GET --> Retrieves all offers of a listing
app.get('/listings/:listing_id/offers/', function (req, res) {

  var listing_id = req.params.listing_id;

  offers.getOffersByListings(listing_id, function (err, result) {

    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// Task 12: Adds an offer for that listing. A user can send more than one offer for the same listing.
app.post('/listings/:listingid/offers/', function (req, res) {

  var listingid = req.params.listingid;
  var offer = req.body.offer;
  var fk_offeror_id = req.body.fk_offeror_id;

  offers.postOffersByListings(offer, fk_offeror_id, listingid, function (err, result) {
    console.log(err)
    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(201);
      res.send({ "offerID": result.insertId });
    }
  });
});




// CA2 : GET --> Retrieving all offers that is received by other users
app.get('/offers/:id/', function (req, res) {

  var id = req.params.id;

  offers.getOffersByUser(id, function (err, result) {

    if (err) {
      res.status = 500;
      res.send(`{"Internal Server Error"}`);

    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// CA2 : GET --> Search(title)
app.get('/alllistings/:title/', function (req, res) {

  var title = req.params.title;

  listings.getTitle(title, function (err, result) {

    if (err) {
      res.status = 500;
      res.send(null);
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

module.exports = app;