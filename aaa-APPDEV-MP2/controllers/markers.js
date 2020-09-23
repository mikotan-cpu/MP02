const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router()
const User = require("../models/users")
const Marker = require("../models/markers")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false,
  });


router.use(urlencoder)


router.get("/usermap", (req, res) => {
  console.log("users controller line 40");
  if (req.session.username) {
    //it means that user has already signepad in
    //go to home.html
    res.render("loggedin-guestmap.hbs", {});
  } else {
    //the user has not logged in
    res.render("guestmap.hbs");
  }
});


router.get("/map", (req, res) => {
  console.log("users controller line 40");
  if (req.session.username) {
    //it means that user has already signepad in
    //go to home.html
    res.render("loggedin-guestmap.hbs", {});
  } else {
    //the user has not logged in
    res.render("guestmap.hbs");
  }
});

  module.exports = router