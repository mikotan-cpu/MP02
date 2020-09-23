const mongoose = require("mongoose")
const crypto = require("crypto")

let User = mongoose.model("user", {
    username: String,
    password: String,
    email: String,
    latitude: Number,
    longitude: Number,
    symptoms: [String],
    status: String
})


exports.isAvailable = function(username){
    return new Promise(function(resolve, reject){
        console.log("is available in users model " + username + "CHECKING")
        User.findOne({
            username: username
        }).then((user)=>{
            console.log("username already taken")
            resolve(user)
        },(err)=>{
            console.log(username + " is available")
            reject(err)
        })
    })  
}

exports.create = function(user){
    return new Promise(function(resolve, reject){
      console.log(user)
      var u = new User(user)
  
      u.save().then((newUser)=>{
        console.log(newUser)
        resolve(newUser)
      }, (err)=>{
        reject(err)
      })
    })
  }
  
exports.login = function(user){
    return new Promise(function(resolve, reject){
      console.log("in promise : " + user.username)
      User.findOne({
        username : user.username,
        // password : crypto.createHash("md5").update(user.password).digest("hex")
        password: user.password
      }).then((user)=>{
        // console.log("callback user : " + user.username)
        resolve(user)
      },(err)=>{
          console.log("error user: " + err)
        reject(err)
      })
    })
  }

// module.exports = {
//     User : User
// }
console.log("i am in users model")