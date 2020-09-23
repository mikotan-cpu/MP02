
const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose")
const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/cobeatph-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public")) // for what>>>>>

app.use(session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
}))

app.use(require("./controllers"))

app.listen(3000, function () {
    console.log("now listening to port 30000");
  })
  