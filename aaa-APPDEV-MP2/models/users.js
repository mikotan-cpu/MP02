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
      console.log("in promise of login: " + user.username)
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

  exports.saveSymptoms = function(user){

    return new Promise(function(resolve, reject){
      console.log(user.username +" updating their username..")
  
  
      User.findOneAndUpdate({
        username:user.username
      },{
          email: newEm
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
  
  
  }


//LEE
exports.updateUn = function(user,newUn){

  return new Promise(function(resolve, reject){
    console.log(user.username +" updating their username..")


    User.findOneAndUpdate({
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


}


//LEE
exports.updatePw = function(user,newPw){

  return new Promise(function(resolve, reject){
    console.log(user.username +" updating their username..")


    User.findOneAndUpdate({
      username:user.username
    },{
        password: newPw
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


}



//LEE
exports.updateEm = function(user,newEm){

  return new Promise(function(resolve, reject){
    console.log(user.username +" updating their username..")


    User.findOneAndUpdate({
      username:user.username
    },{
        email: newEm
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


}
//adding symptoms
exports.addSymp = function(user){
  return new Promise(function(resolve, reject){
    console.log(user.username +" updating their username..")


    User.findOneAndUpdate({
      username:user.username
    },{
        status: user.status,
        latitude: user.latitude,
        longitude: user.longitude
        // $push: {
        //   symptoms:user.symptoms
        // }
    },{
        new: true //para makita mo sa console yung updated
    }).then((doc)=>{
        console.log("Updated userstatus: "+ JSON.stringify(doc))
        resolve(doc)
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