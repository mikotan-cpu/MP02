const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const User = require("../models/users");
const Marker = require("../models/markers");

const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});

router.use(urlencoder);

router.post("/register", urlencoder, (req, res) => {
  let username = req.body.un;
  let password = req.body.pw;

  console.log(username + " is registering");
  if (username.trim() == "" || password.trim() == "") {
    res.render("register.hbs", {
      error: "Enter a username and password",
    });
  } else if (isAvailable(username) == false) {
    res.render("register.hbs", {
      error: "Username not available",
    });
  } else {
    let user = new User({
      username: req.body.un,
      password: req.body.pw,
      email: req.body.em,
    });

    req.session.username = req.body.un;

    user.save().then((doc) => {
      res.redirect("loggedin-index.hbs");
    });
  }
});

router.post("/login", urlencoder, (req, res) => {
  req.session.username = req.body.un;
  req.session.password = req.body.pw;

  if (matches(req.session.username, req.session.password) == false) {
    res.render("login-page2.hbs", {
      error: "Username and password does not match", //ilalagay toh as {{error}} dun sa login-page2.js
    });
  } else {
    res.render("loggedin-index.hbs", {
      //palitan yung home.hbs with homepage natin basically index html
      username: req.session.username,
    });
  }
});

router.get("/map", (req, res) => {
  console.log("users controller line 5getting map in marker controller");

   let username =  req.session.username

   if (req.session.username) {

  Marker.isAvailable(username).then(
    (newUser) => {
      if (newUser) {
        
        console.log(newUser.username + " has already a marker")
        res.render("final-map.hbs", {});
        
      } else {
        console.log(username + " has no marker")
        res.render("loggedin-guestmap.hbs");
      }
    },
    (error) => {
      console.log("error logging in: " + error);
    }
  );
   }
   else{
     res.render("guestmap.hbs")
   }

  // if (req.session.username) {
  //   //it means that user has already signepad in
  //   //go to home.html
  //   res.render("loggedin-guestmap.hbs", {});
  // } else {
  //   //the user has not logged in
  //   res.render("guestmap.hbs");
  // }
});


router.get("/finalMap", (req, res) => {
  console.log("users controller line 70");
  res.render("final-map.hbs");
});

module.exports = router;
