let symptoms = [
  "fever", "drycough", "ache", "fatigue", "sorethroat", "shortnessOfBreath",
  "diarrhea", "lostOfSmell", "headache"
]

var userInfo = {
  symptoms: []
};


// $(document).ready(function () {

  $("input[type=checkbox]").on("change", function () {
    let symptom = $(this).val()
    
    if ($(this).is(":checked")) {
      userInfo.symptoms.push($(this).val());
    }
    if (!$(this).is(":checked")) {
          let symptom = $(this).val()
          for(var i = userInfo.symptoms.length - 1; i >= 0; i--) {
            if(userInfo.symptoms[i] == symptom) {
              userInfo.symptoms.splice(i, 1);
            }
            console.log("symptom " + userInfo.symptoms[i] + " is added to userinfo")
        }
    
        }


    if(isInSymptoms(symptom))
    {
      $("#noneOfTheAbove").prop("checked", false)
      spliceSymptom(symptom)
    }
    else if(symptom=="noneOfTheAbove")
    {
        $("#fever").prop("checked", false)
        $("#drycough").prop("checked", false)
        $("#ache").prop("checked", false)
        $("#fatigue").prop("checked", false)
        $("#sorethroat").prop("checked", false)
        $("#shortnessOfBreath").prop("checked", false)
        $("#diarrhea").prop("checked", false)
        $("#lostOfSmell").prop("checked", false)
        $("#headache").prop("checked", false)
        spliceSymptom(symptom)

    }
    
  

  });

  // $("input[type=checkbox]").on("change", function () {
  //   if (!$(this).is(":checked")) {
  //     let symptom = $(this).val()
  //     for(var i = userInfo.symptoms.length - 1; i >= 0; i--) {
  //       if(userInfo.symptoms[i] == symptom) {
  //         userInfo.symptoms.splice(i, 1);
  //       }
  //       console.log("symptom " + userInfo.symptoms[i] + " is added to userinfo")
  //   }

  //   }
  // });

  function isInSymptoms(symptom)
  {
   
    for(let i=0; i<symptoms.length; i++)
    {
     
      if(symptoms[i] == symptom)
        {
          
          return true
        }
    }
    
    return false

  }

  function spliceSymptom(symptom)
  {
    //if noneOTA is clicked, remove the rest of the symptoms from the array
    if(symptom == "noneOfTheAbove")
    {
      console.log("deleting other symptoms")
      for(var i = userInfo.symptoms.length - 1; i >= 0; i--) {
        if(isInSymptoms(userInfo.symptoms[i])) {
          userInfo.symptoms.splice(i, 1);
        }
      }
    }
    else if(isInSymptoms(symptom))
    {
      //if a symtpom is clicked, remove the rest of the none of the above from the array
      console.log("deleting none of the above")
      for(var i = userInfo.symptoms.length - 1; i >= 0; i--) {
        if(userInfo.symptoms[i] == "noneOfTheAbove") {
          userInfo.symptoms.splice(i, 1);
        }
      }
    }
   
  }



  
  $("input[value=shareLocation]").on("change", function () {
    if ($(this).is(":checked")) {
      console.log("user agreed to share location");
      getLocation();
    }
  });

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
    );

    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat + long);
    userInfo.lat = lat;
    userInfo.long = long;
    //   initMap()
  }

  function getHealthStatus() {
    var status;
    let pass = 0;
    for (var i = 0; i < userInfo.symptoms.length; i++) 
    {
      
        console.log("checking health status " + userInfo.symptoms[i])
        if (userInfo.symptoms[i] == "positive") {
          console.log("user is positive");
          status = "confirmed";
          break
        } else if (userInfo.symptoms[i] == "noSymptoms") {
          status = "noSymptoms";
          pass = 1 
          break
        } else if (userInfo.symptoms[i] == "recovered") {
          status = "recovered";
          pass =1
          break
        } else if (
          userInfo.symptoms[i] == "traveled" ||
          userInfo.symptoms[i] == "contact" ||
          userInfo.symptoms[i] == "contact"
        ) {
          status = "suspect";

        }
      
    }
    console.log("get health status: " + status);
    userInfo.status = status;
  }
// });

$.post('/markers/getUser', function(username){
  console.log("username is " + username)
  userInfo.username = username
})


$("#submitInfo").click(function () {

  console.log("submitinfo is CLICKED GOING TO FINALMAPJS")
  console.log("submit info click:" + JSON.stringify(userInfo));

  getHealthStatus();
 
  console.log("HAHAHA " + userInfo.username)

    $.post('/markers/saveSymptoms', {
      user2: userInfo.username,
      status: userInfo.status,
      latitude: userInfo.lat,
      longitude: userInfo.long,
      symptoms: userInfo.symptoms
    }, function(userInfo){
    console.log(JSON.stringify(userInfo) + "\n" + "userIasadnfo")
  })
    
});

$("#editInfo").click(function () {

  console.log(userInfo.username + " is editing their marker")
  console.log("edit info click:" + JSON.stringify(userInfo));

  getHealthStatus();
 
  console.log(" " + userInfo.username)

    $.post('/markers/editSymptoms', {
      user2: userInfo.username,
      status: userInfo.status,
      latitude: userInfo.lat,
      longitude: userInfo.long,
      symptoms: userInfo.symptoms
    }, function(userInfo){
    console.log(JSON.stringify(userInfo) + "\n" + "userIasadnfo")
  })
    
});