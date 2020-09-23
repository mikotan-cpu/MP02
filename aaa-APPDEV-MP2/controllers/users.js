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

router.get("/register", (req, res)=>{
      if (req.session.username) {
        //it means that user has already signed in
        //go to home.html
        res.render("loggedin-index.hbs", {
          //palitan yung home.hbs with homepage natin basically index html
          username: req.session.username,
        });
      } else {
        //the user has not logged in
        //go to index.html
        res.render("register.hbs");
      }
    });

//register
router.post("/register", urlencoder, (req, res) => {
    let username = req.body.un;
    let password = req.body.pw;
    console.log(username + " is registering")

    

    if (username.trim() == "" || password.trim() == "") {
      res.render("register.hbs", {
        error: "Enter a username and password",
      });   
    } 
    
    User.isAvailable(username).then((newUser)=>{
      if(!newUser)
      {
        let user = {
          username: req.body.un,
          password: req.body.pw,
          email: req.body.em
        }
      
          req.session.username = req.body.un;
          User.create(user).then((doc)=>{
          res.render("loggedin-index.hbs")
      })
  
      }
      else{
           res.render("register.hbs", {
               error: "Username not available",
           });
      }
    }, (error)=>{
      console.log("error logging in: " + error)
    })
  });


router.post("/login", urlencoder, (req, res)=>{
    console.log("POST /user/login")
    console.log(req.body.un + " is the username")
  let user = {
    username : req.body.un,
    password : req.body.pw
  }
  console.log("post login " + req.body.un)
  // console.log("post login " + user)

  User.login(user).then((newUser)=>{
    // console.log("authenticate " + newUser)
    if(newUser){
      console.log("trying to login")
      req.session.username = user.username
     
        res.render("loggedin-index.hbs")
      
    }
    else{
      res.render("login-page2.hbs", {
        error: "Username and password does not match" //ilalagay toh as {{error}} dun sa login-page2.js
      });
    }
  }, (error)=>{
    console.log("error logging in: " + error)
  })

  })
  
  //going to login page
  router.get("/login", (req, res) => {
    console.log("users controller line 99")
      if (req.session.username) {
        //it means that user has already signepad in
        //go to home.html
        res.render("loggedin-index.hbs", {
          //palitan yung home.hbs with homepage natin basically index html
          username: req.session.username,
        });
      } else {
        //the user has not logged in
        //go to index.html
        res.render("login-page2.hbs");
      }
    });


  module.exports = router