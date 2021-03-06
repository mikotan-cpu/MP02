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
router.get("/", function (req, res) {
  User.getCases().then(
    (cases) => {
      // console.log("authenticate " + newUser)
      if (cases) {
        console.log("cases scraped");
        recovered = cases.recovered;
        total = cases.total;
        death = cases.deaths;
      } else {
        console.log("error scraping");
      }
    },
    (error) => {
      console.log("error scraping in: " + error);
    }
  );
});
router.get("/register", (req, res) => {
  if (req.session.username) {
    //it means that user has already signed in
    //go to home.html
    User.getCases().then(
      (cases) => {
        // console.log("authenticate " + newUser)
        if (cases) {
          console.log("cases scraped");
          recovered = cases.recovered;
          total = cases.total;
          death = cases.deaths;
          if (req.session.username) {
            console.log("/2");
            //it means that user has already signed in
            //go to home.html
            res.render("loggedin-index.hbs", {
              recovered: recovered,
              total: total,
              death: death,
              username: req.session.username,
              password: req.session.password
            });
          } else {
            //the user has not logged in
            console.log("is scraped? " + recovered);
            res.render("index.hbs", {
              recovered: recovered,
              total: total,
              death: death,
            });
          }
        } else {
          console.log("error scraping");
        }
      },
      (error) => {
        console.log("error scraping in: " + error);
      }
    );
  } else {
    //the user has not logged in
    res.render("register.hbs");
  }
});

//register
router.post("/register", urlencoder, (req, res) => {
  let username = req.body.un;
  let password = req.body.pw;
  console.log(username + " is registering");

  if (username.trim() == "" || password.trim() == "") {
    res.render("register.hbs", {
      error: "Enter a username and password",
    });
  }
  else{
    User.isAvailable(username).then(
      (newUser) => {
        if (!newUser) {
          let user = {
            username: req.body.un,
            password: req.body.pw,
            email: req.body.em,
          };
  
          req.session.username = req.body.un;
          req.session.password = req.body.pw;
          User.create(user).then((doc) => {
            User.getCases().then(
              (cases) => {
                // console.log("authenticate " + newUser)
                if (cases) {
                  console.log("cases scraped");
                  recovered = cases.recovered;
                  total = cases.total;
                  death = cases.deaths;
                  if (req.session.username) {
                    console.log("/2");
                    //it means that user has already signed in
                    //go to home.html
                    res.render("loggedin-index.hbs", {
                      recovered: recovered,
                      total: total,
                      death: death,
                      username: req.session.username,
                    });
                  } else {
                    //the user has not logged in
                    console.log("is scraped? " + recovered);
                    res.render("index.hbs", {
                      recovered: recovered,
                      total: total,
                      death: death,
                    });
                  }
                } else {
                  console.log("error scraping");
                }
              },
              (error) => {
                console.log("error scraping in: " + error);
              }
            );
          });
        } else {
          res.render("register.hbs", {
            error: "Username not available",
          });
        }
      },
      (error) => {
        console.log("error logging in: " + error);
      }
    );
  }
  
});

router.post("/login", urlencoder, (req, res) => {
  console.log("POST /user/login");
  console.log(req.body.un + " is the username");

  let user = {
    username: req.body.un,
    password: req.body.pw,
  };
  console.log("post login " + req.body.un);
  // console.log("post login " + user)

  User.login(user).then(
    (newUser) => {
      // console.log("authenticate " + newUser)
      if (newUser) {
        console.log("trying to login");
        req.session.username = user.username;
        req.session.password = user.password;
        User.getCases().then(
          (cases) => {
            // console.log("authenticate " + newUser)
            if (cases) {
              console.log("cases scraped");
              recovered = cases.recovered;
              total = cases.total;
              death = cases.deaths;
              if (req.session.username) {
                console.log("/2");
                //it means that user has already signed in
                //go to home.html
                res.render("loggedin-index.hbs", {
                  recovered: recovered,
                  total: total,
                  death: death,
                });
              } else {
                //the user has not logged in
                console.log("is scraped? " + recovered);
                res.render("index.hbs", {
                  recovered: recovered,
                  total: total,
                  death: death,
                });
              }
            } else {
              console.log("error scraping");
            }
          },
          (error) => {
            console.log("error scraping in: " + error);
          }
        );
      } else {
        res.render("login-page2.hbs", {
          error: "Username and password does not match", //ilalagay toh as {{error}} dun sa login-page2.js
        });
      }
    },
    (error) => {
      console.log("error logging in: " + error);
    }
  );
});

//going to login page
router.get("/login", (req, res) => {
  console.log("users controller line 99");
  if (req.session.username) {
    //it means that user has already signepad in
    //go to home.html
    res.render("loggedin-index.hbs", {
      //palitan yung home.hbs with homepage natin basically index html
      username: req.session.username,
    });
  } else {
    //the user has not logged in
    res.render("login-page2.hbs");
  }
});

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/symptoms", (req, res) => {
  console.log("user getting symptoms in user controller");

  let username = req.session.username;

  if (req.session.username) {
    Marker.isAvailable(username).then(
      (newUser) => {
        if (newUser) {
          console.log(newUser.username + " has already a marker");
          res.render("Symptoms-updater.hbs", {});
        } else {
          console.log(username + " has no marker");
          res.render("Symptoms.hbs");
        }
      },
      (error) => {
        console.log("error getting symptoms: " + error);
      }
    );
  }
});
//EDIT ACCOUNT
//LEE
router.get("/myAcc", (req, res) => {
  console.log("getting myAcc");
  let user = {
    username: req.session.username,
    password: req.session.password,
  };

  console.log("user going to my acc: " + user.username + "pass: " +  user.password)
  User.login(user).then(
    (newUser) => {
      // console.log("authenticate " + newUser)
      if (newUser) {
        console.log(req.session.username + "is going to view their account");
        req.session.username = user.username;

          if(newUser.status == "noSymptoms")
              newUser.status = "No Symptoms"
        res.render("myAcc.hbs", {
          status: newUser.status,
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
        });
      } else {
        console.log("can't get my acc linw 278 users controller");
      }
    },
    (error) => {
      console.log("error logging in: " + error);
    }
  );
});

//LEE
router.post("/editUn", urlencoder, (req, res) => {
  let user = {
    username: req.session.username,
    password: req.session.password,
  };
  let newUn = req.body.un;

  Marker.updateUn(user, newUn).then(
    (newUser) => {
      // console.log("authenticate " + newUser)
      if (newUser) {
        console.log(user.username + " has updated their username");
        req.session.username = newUn;
        console.log("ETO NA PO " + req.session.username + "2!!!!");
      } else {
        console.log("HEHE");
      }
    },
    (error) => {
      console.log("error logging in: " + error);
    }
  );

  User.updateUn(user, newUn).then(
    (newUser) => {
      // console.log("authenticate " + newUser)
      if (newUser) {
        console.log(user.username + " has updated their username");
        req.session.username = newUn;
        console.log("ETO NA PO " + req.session.username);
        res.render("myAcc.hbs", {
          status: newUser.status,
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
        });
      } else {
        console.log("HEHE");
      }
    },
    (error) => {
      console.log("error logging in: " + error);
    }
  );
});

//LEE
router.post("/editPw", urlencoder, (req, res) => {
  let user = {
    username: req.session.username,
    password: req.session.password,
  };
  let newPw = req.body.pw;

  User.updatePw(user, newPw).then(
    (newUser) => {
      // console.log("authenticate " + newUser)
      if (newUser) {
        console.log(user.username + " has updated their username");

        res.render("myAcc.hbs", {
          status: newUser.status,
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
        });
      } else {
        console.log("HEHE");
      }
    },
    (error) => {
      console.log("error logging in: " + error);
    }
  );
});

//LEE
router.post("/editEm", urlencoder, (req, res) => {
  let user = {
    username: req.session.username,
    password: req.session.password,
  };
  let newEm = req.body.em;

  User.updateEm(user, newEm).then(
    (newUser) => {
      // console.log("authenticate " + newUser)
      if (newUser) {
        console.log(user.username + " has updated their username");

        res.render("myAcc.hbs", {
          status: newUser.status,
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
        });
      } else {
        console.log("HEHE");
      }
    },
    (error) => {
      console.log("error logging in: " + error);
    }
  );
});

module.exports = router;
