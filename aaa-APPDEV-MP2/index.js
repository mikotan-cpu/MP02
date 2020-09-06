// const express = require("express");
// const bodyParser = require("body-parser");
// const session = require("express-session");

// const app = express();

// const urlencoder = bodyParser.urlencoded({
//   extended: false,
// });
// app.use(
//   session({
//     secret: "very secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 3,
//     },
//   })
// );

// app.get("/register", function (req, res) {
//   if (req.session.username) {
//     res.sendFile(__dirname + "/html-pages/home.html");
//   } else {
//     res.sendFile(__dirname + "/html-pages/register.html");
//   }
// });

// app.post("/register", urlencoder, function (req, res) {
//   req.session.username = req.body.un;
//   res.sendFile(__dirname + "/html-pages/home.html");
// });

// app.post("/login", urlencoder, function (req, res) {
//   req.session.username = req.body.un;

//   res.sendFile(__dirname + "/html-pages/home.html");
// });
// app.use(express.static(__dirname));

// app.listen(3000, function () {
//   console.log("now listening to port 3000");
//   console.log(__dirname);
// });

const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");

const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});

let users = [];

app.use(
  session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(express.static(__dirname));


app.get("/", (req, res)=>{
  if(req.session.username){
      //it means that user has already signed in
      //go to home.html
      res.render(__dirname+"/views/views/html-pages/loggedin-index.hbs")

  }else{
       //the user has not logged in
      //go to index.html
      res.sendFile(__dirname+"/views/views/html-pages/index.html",{ //palitan yung home.hbs with homepage natin basically index html
        username:req.session.username
    })
  }
})


app.get("/register", (req, res) => {
  if (req.session.username) {
    //it means that user has already signed in
    //go to home.html
    res.render(__dirname + "/views/views/html-pages/loggedin-index.hbs", {
      //palitan yung home.hbs with homepage natin basically index html
      username: req.session.username,
    });
  } else {
    //the user has not logged in
    //go to index.html
    res.render(__dirname + "/views/views/html-pages/register.hbs");
  }
});

app.post("/register", urlencoder, (req, res) => {
  let username = req.body.un;
  let password = req.body.pw;

  if (username.trim() == "" || password.trim() == "") {
    res.render("views/html-pages/register.hbs", {
      error: "Enter a username and password",
    });
  } else if (!isAvailable(username)) {
    res.render("views/html-pages/register.hbs", {
      error: "Username not available",
    });
  } else {
    // save user to the db //user []
    users.push({
      username: username,
      password: password,
    });
    req.session.username = req.body.un;

    for (let i = 0; i < users.length; i++) {
      //para lang toh macheck yung laman ng user array hehe everytime may nag reregister
      console.log(users[i].username);
    }
    res.render(__dirname + "/views/views/html-pages/loggedin-index.hbs");
  }
});

app.get("/login", (req, res) => {
  if (req.session.username) {
    //it means that user has already signed in
    //go to home.html
    res.render(__dirname + "/views/views/html-pages/loggedin-index.hbs", {
      //palitan yung home.hbs with homepage natin basically index html
      username: req.session.username,
    });
  } else {
    //the user has not logged in
    //go to index.html
    res.render(__dirname + "/views/views/html-pages/login-page2.hbs");
  }
});
app.post("/login", urlencoder, (req, res) => {
  req.session.username = req.body.un;
  req.session.password = req.body.pw;

  if (!matches(req.session.username, req.session.password)) {
    res.render("views/html-pages/login-page2.hbs", {
      error: "Username and password does not match", //ilalagay toh as {{error}} dun sa login-page2.js
    });
  } else {
    res.render(__dirname + "/views/views/html-pages/loggedin-index.hbs", {
      //palitan yung home.hbs with homepage natin basically index html
      username: req.session.username,
    });
  }
});

function isAvailable(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) {
      return false;
    }
  }
  return true;
}

function matches(username, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      return true;
    }
  }
  return false;
}

app.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.listen(3000, function () {
  console.log("now listening to port 30000");
});
