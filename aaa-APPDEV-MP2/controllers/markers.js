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



var userUsername 
router.get("/map", (req, res) => {

   userUsername  =  req.session.username

   if (req.session.username) {

    
  Marker.isAvailable(userUsername ).then(
    (newUser) => {
      if (newUser) {
        
        console.log(newUser.username + " has already a marker")
        res.render("final-map.hbs", {});
        
      } else {
        console.log(userUsername  + " has no marker")
        res.render("loggedin-guestmap.hbs");
      }
    },
    (error) => {
      console.log("error logging in: " + error);
    }
  );
   }
   else{
     console.log("going to guestmap")
     res.render("guestmap.hbs")
   }
});


router.get("/finalMap", (req, res) => {
  console.log("printing symptsoms in finalmap");
  let symptoms = req.body.symptoms;
  console.log("symptoms: " + JSON.stringify(req.body));
  res.render("final-map.hbs");
});



router.post("/getArray", urlencoder, (req, res) => {
  console.log(" /getArray");
  let symptoms = req.body.symptoms;
  console.log("symptoms: " + JSON.stringify(req.body));
  // res.send(JSON.stringify(symptoms));
  console.log("trying to render finalmap")
  res.render("final-map.hbs");
  console.log("rendered finalmap")
});

router.post("/getMarkers", (req, res) => {
  Marker.getMarkers((error, model)=>{
   
    // console.log(JSON.stringify(model) + "\n" + "haha")
    res.send(model)
  
})
})

router.post("/getUser", (req, res) => {
  console.log("sending " + userUsername + " to symptoms js")
  res.send(userUsername)
})

router.post("/saveSymptoms", urlencoder, (req, res) => {
  console.log("saving symptoms in marker controller")
  
  console.log("got the item: " + req.body.user2)
  console.log("got the item: " + req.body.status)
  console.log("got the item: " + req.body.latitude)
  console.log("got the item: " + req.body.longitude)
  let user = {
    status : req.body.status,
    username: req.body.user2,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  }
  // console.log("got the item: " + JSON.stringify(req.body.symptoms)
  console.log("got the item body: " + JSON.stringify(req.body))
  Marker.saveSymptoms(user).then(
    (newUser) => {
      if (newUser) {
        console.log("updating status");
       console.log(newUser.username + " updated!")
      } else {
        console.log("Error line 88 marker controller")
      }
    },
    (error) => {
      console.log("error updating user status: " + error);
    }
  );

  User.addSymp(user).then(
    (newUser) => {
      if (newUser) {
        console.log("updating status");
       console.log(newUser.username + " updated!")
      } else {
        console.log("Error line 88 marker controller")
      }
    },
    (error) => {
      console.log("error updating user status: " + error);
    }
  );

})


router.post("/editSymptoms", urlencoder, (req, res) => {
  console.log("editing symptoms in marker controller")
  
  console.log("got the item: " + req.body.user2)
  console.log("got the item: " + req.body.status)
  console.log("got the item: " + req.body.latitude)
  console.log("got the item: " + req.body.longitude)
  let user = {
    status : req.body.status,
    username: req.body.user2,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  }
  // console.log("got the item: " + JSON.stringify(req.body.symptoms)
  console.log("got the item body: " + JSON.stringify(req.body))
  Marker.editSymptoms(user).then(
    (newUser) => {
      if (newUser) {
        console.log("updating status");
       console.log(newUser.username + " status updated!")
      } else {
        console.log("Error line 193 marker controller")
      }
    },
    (error) => {
      console.log("error updating user status: " + error);
    }
  );

  User.addSymp(user).then(
    (newUser) => {
      if (newUser) {
        console.log("updating status");
       console.log(newUser.username + " updated!")
      } else {
        console.log("Error line 88 marker controller")
      }
    },
    (error) => {
      console.log("error updating user status: " + error);
    }
  );

})

module.exports = router;
