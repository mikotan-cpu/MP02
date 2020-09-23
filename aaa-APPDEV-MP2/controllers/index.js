const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
// const mongoose = require("mongoose")
const router = express.Router();

const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});

const User = require("../models/users.js").User;
const Marker = require("../models/markers.js").Marker;

router.use("/users", require("./users"));
router.use("/markers", require("./markers"));
//router.use("/index", require("./index"));

// router.use("/login", require("./users"))



router.get("/FAQS", function (req, res) {
  console.log("get faqs");
  //load data from db
  
    res.sendFile(path.join(__dirname, '../public', 'FAQs.html') ) //__dirname + "/public/FAQs.html");
  
});

router.get("/", function (req, res) {
  console.log("New GET /");
  //load data from db
  console.log("/");
  if (req.session.username) {
    console.log("/2");
    //it means that user has already signed in
    //go to home.html
    res.render("loggedin-index.hbs");
  } else {
    //the user has not logged in
    res.render("index.hbs");
  }
});

app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

module.exports = router;

// app.post("/register", urlencoder, (req, res) => {
//   let username = req.body.un;
//   let password = req.body.pw;

//   console.log(username + " is registering")
//   if (username.trim() == "" || password.trim() == "") {
//     res.render("register.hbs", {
//       error: "Enter a username and password",
//     });

//   } else if (isAvailable(username) == false) {
//     res.render("register.hbs", {
//       error: "Username not available",
//     });

//   } else {
//     // save user to the db //user []
//     // users.push({
//     //   username: username,
//     //   password: password,
//     // });
//     let user = new User({
//       username: req.body.un,
//       password: req.body.pw,
//       email: req.body.em
//     })

//     req.session.username = req.body.un;

//     user.save().then((doc)=>{
//           res.redirect("loggedin-index.hbs")
//     })

//     // for (let i = 0; i < users.length; i++) {
//     //   //para lang toh macheck yung laman ng user array hehe everytime may nag reregister
//     //   console.log(users[i].username);
//     // }
//     // res.render("loggedin-index.hbs");
//   }
// });

// app.get("/login", (req, res) => {
//   if (req.session.username) {
//     //it means that user has already signepad in
//     //go to home.html
//     res.render("loggedin-index.hbs", {
//       //palitan yung home.hbs with homepage natin basically index html
//       username: req.session.username,
//     });
//   } else {
//     //the user has not logged in
//     res.render("login-page2.hbs");
//   }
// });

// app.post("/login", urlencoder, (req, res) => {
//   req.session.username = req.body.un;
//   req.session.password = req.body.pw;

//   if (matches(req.session.username, req.session.password) == false) {
//     res.render("login-page2.hbs", {
//       error: "Username and password does not match", //ilalagay toh as {{error}} dun sa login-page2.js
//     });
//   } else {
//     res.render("loggedin-index.hbs", {
//       //palitan yung home.hbs with homepage natin basically index html
//       username: req.session.username,
//     });
//   }
// });

// app.use(express.static(__dirname));

// function isAvailable(username) {

//   User.findOne({
//         username: username
//     }).then((doc)=>{
//       console.log(username + " is available")
//         return true;
//     },(err)=>{
//       ("username is not  available")
//        return false;
//     })

// //   for (let i = 0; i < users.length; i++) {
// //     if (users[i].username == username) {
// //       return false;
// //     }
// //   }
// //   return true;
// }

// function matches(username, password) {

//   User.findOne({
//         username: username,
//         password: password
//     }).then((doc)=>{
//       console.log("username and password matched")
//         return true;
//     },(err)=>{
//       console.log("username and password not match")
//         return false;
//     })

//   // for (let i = 0; i < users.length; i++) {
//   //   if (users[i].username == username && users[i].password == password) {
//   //     return true;
//   //   }
//   // }
//   // return false;
// }

// app.get("/signout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

// // let userInfo = require(__dirname + "/assets/js/symptoms.js");
// // console.log(userInfo);

// app.post("/getArray", (req, res) => {
//   console.log("POST /getArray");
//   let symptoms = req.body.symptoms;
//   console.log("symptoms: " + JSON.stringify(req.body));
//   res.send(JSON.stringify(symptoms));
// });
