const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});

app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/assets"));

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://mikotan:09235786438@cobeat.ebtkj.mongodb.net/CoBeat?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((doc) => {
    console.log("connected to mongodb");
  });

app.set("view engine", "hbs");
//app.use(express.static(__dirname + "/public")) // for what>>>>>

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
console.log("going to controllers");
app.use(require("./controllers"));
app.listen(process.env.PORT || 5000, function () {
  console.log("listening on *:5000");
});
