const mongoose = require("mongoose");

console.log("i am in markers model ")
let Marker = mongoose.model("marker", {
  username: String,
  type: String,
  latitude: Number,
  longitude: Number,
});

exports.isAvailable = function (username) {
  return new Promise(function (resolve, reject) {
      Marker.findOne({
      username: username,
    }).then(
      (user) => {
        console.log("line 17 markers model marker with username found");
        resolve(user);
      },
      (err) => {
        console.log(username + " not found");
        reject(err);
      }
    );
  });
};


exports.updateUn = function(user,newUn){

  return new Promise(function(resolve, reject){
    console.log(user.username +" updating their username..")


    Marker.findOneAndUpdate({
      username:user.username
    },{
        username: newUn
    },{
        new: true //para makita mo sa console yung updated
    }).then((doc)=>{
        console.log("Updated doc: "+ JSON.stringify(doc))
        resolve(doc)
    },(err)=>{
      console.log("error user: " + err)
        reject(err)
    })


  })

};



exports.getMarkers = function(next){
  console.log("getmarkers function")
  Marker.find({}, (err, model) => {
    next(err, model)
  })
}
  

exports.saveSymptoms = function(user){
  return new Promise(function(resolve, reject){
    console.log(user)
    var m = new Marker(user)
    m.username = user.username;
    m.type = user.status;
    m.latitude = user.latitude;
    m.longitude = user.longitude;

    m.save().then((newUser)=>{
      console.log(newUser.username + " has added their marker to the map")
      resolve(newUser)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.editSymptoms = function(user){
  return new Promise(function(resolve, reject){
    console.log(user)
    var m = new Marker(user)
    m.username = user.username;
    m.type = user.status;

    Marker.findOneAndUpdate({
      username: m.username
    },{
        type: m.type,
    },{
        new: true //para makita mo sa console yung updated
    }).then((newUser)=>{
      console.log(newUser.username + " has edited their marker to the map")
      resolve(newUser)
    }, (err)=>{
      reject(err)
    })
  })
}



// // module.exports = router;

// module.exports = markers 

// let hi = "sdasdas"
// module.exports = hi