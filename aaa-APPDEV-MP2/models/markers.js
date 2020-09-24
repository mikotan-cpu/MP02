const mongoose = require("mongoose");

let Marker = mongoose.model("marker", {
  username: String,
  type: String,
  latitude: Number,
  longitude: Number,
});

exports.isAvailable = function (username) {
  return new Promise(function (resolve, reject) {
    console.log("is available in marker model " + username + " CHECKING");

    Marker.findOne({
      username: username,
    }).then(
      (user) => {
        console.log("marker with username found");
        resolve(user);
      },
      (err) => {
        console.log(username + " not found");
        reject(err);
      }
    );
  });
};



// module.exports = {
//   Marker: Marker,
// // };


// module.exports = router;
