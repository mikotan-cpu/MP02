const mongoose = require("mongoose")
const crypto = require("crypto")
const axios = require('axios');


let User = mongoose.model("user", {
    username: String,
    password: String,
    email: String,
    latitude: Number,
    longitude: Number,
    symptoms: [String],
    status: String
})


// exports.getMarkers = function(next){
//   console.log("getmarkers function")
//   Marker.find({}, (err, model) => {
//     next(err, model)
//   })
// }


exports.getCases = function(){
 
  console.log("getting casess")
  return new Promise(function(resolve, reject){

  const printNumbers = async () => {
    try {
      const { data } = await axios.get(
        'https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=PH'
      );
          
      let cases = {
        total: 0,
        deaths: 0,
        recovered: 0
      }
        
          cases.total = data[0].totalConfirmed
          cases.deaths = data[0].totalDeaths
          cases.recovered = data[0].totalRecovered
          console.log("Confirmed cases: " + cases.total)
          console.log("Confirmed deaths: " + cases.deaths)
          console.log("Confirmed recovered: " + cases.recovered)

          // console.log("Confirmed cases: " + JSON.stringify(data[0].totalConfirmed))
          // console.log("Confirmed deaths: " + JSON.stringify(data[0].totalDeaths))
          // console.log("Confirmed recovered: " + JSON.stringify(data[0].totalRecovered))
          resolve(cases)
    } catch (error) {
          console.log("error: " + error)
          reject(error)
      throw error;
     
    }
  };
  
  printNumbers() 
})   

}


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
      console.log("users model line 98: in promise of login: " + user.username)
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
      console.log(user.username +" updating their symptoms..")
  
  
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