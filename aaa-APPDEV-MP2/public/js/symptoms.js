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
    else if(symptom=="positive")
    {
      $("#recovered").prop("checked", false)
      $("#tested").prop("checked", false)
      spliceSymptom(symptom)
    }
    else if(symptom=="recovered")
    {
      $("#positive").prop("checked", false)
      $("#tested").prop("checked", false)
      spliceSymptom(symptom)
    }
    else if(symptom == "tested")
    {
      $("#positive").prop("checked", false)
      $("#recovered").prop("checked", false)
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
    else if(symptom == "recovered")
    {
      console.log("deleting positive")
      for(var i = userInfo.symptoms.length - 1; i >= 0; i--) {
        if(userInfo.symptoms[i] == "positive" || userInfo.symptoms[i] == "tested") {
          userInfo.symptoms.splice(i, 1);
        }
      }
    }
    else if(symptom == "positive")
    {
      console.log("deleting recovered")
      for(var i = userInfo.symptoms.length - 1; i >= 0; i--) {
        if(userInfo.symptoms[i] == "recovered" || userInfo.symptoms[i] == "tested" ) {
          userInfo.symptoms.splice(i, 1);
        }
      }
    }
    else if(symptom == "tested")
    {
      console.log("deleting recovered + positive")
      for(var i = userInfo.symptoms.length - 1; i >= 0; i--) {
        if(userInfo.symptoms[i] == "recovered" || userInfo.symptoms[i] == "positive" ) {
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
    let addLat = Math.random() * 100 / 1000
    let addLong = Math.random() * 100 / 1000

    let lat = position.coords.latitude + addLat;
    let long = position.coords.longitude +addLong;
    
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
        } else if (userInfo.symptoms[i] == "noneOfTheAbove") {
          status = "noSymptoms";
           
          break
        } else if (userInfo.symptoms[i] == "recovered") {
          status = "recovered";
      
          break
        } else if (
          (userInfo.symptoms[i] == "traveled" ||
          userInfo.symptoms[i] == "contact" ||
          userInfo.symptoms[i] == "contact")  ) 
          {
            for(let j = 0; j<userInfo.symptoms.length; j++)
            {
              if(isInSymptoms(userInfo.symptoms[j]))
              {
                status = "suspect";
                
              }
            }
              if(status == "suspect" && ($("#tested").is(":checked")))
              {
                status = "probable"
                break
              }

        }
      
    }
    console.log("get health status: " + status);
    userInfo.status = status;
  }
// });

$.post('/markers/getUser', function(username){
  console.log("[194-SYMPYTOMS.JS] - ooUSERNAME IS " + username)
  userInfo.username = username
})


// $("#submitInfo").click(function () {

//   if ($("#shareLoc").is(":checked"))
//   {
//     console.log("submitinfo is CLICKED GOING TO FINALMAPJS")
//     console.log("submit info click:" + JSON.stringify(userInfo));
  
//     getHealthStatus();
   
//     console.log("HAHAHA " + userInfo.username)
  
//       $.post('/markers/saveSymptoms', {
//         user2: userInfo.username,
//         status: userInfo.status,
//         latitude: userInfo.lat,
//         longitude: userInfo.long,
//         symptoms: userInfo.symptoms
//       }, function(userInfo){
//       console.log(JSON.stringify(userInfo) + "\n" + "userIasadnfo")
//     })
      
//   }
//   else{
//     alert("Please agree to share location first")
//   }

// });

// $("#editInfo").click(function () {

//   console.log(userInfo.username + " is editing their marker")
//   console.log("edit info click:" + JSON.stringify(userInfo));

//   getHealthStatus();
 
//   console.log(" " + userInfo.username)

    
//     $.post('/markers/editSymptoms', {
//       user2: userInfo.username,
//       status: userInfo.status,
//       latitude: userInfo.lat,
//       longitude: userInfo.long,
//       symptoms: userInfo.symptoms
//     }, function(userInfo){
//     console.log(JSON.stringify(userInfo) + "\n" + "userIasadnfo")
//   })
    
// });



$("#editInfo").click(function (e) {
    e.preventDefault()

    console.log(userInfo.username + " is editing their marker")
    console.log("edit info click:" + JSON.stringify(userInfo));
  
    getHealthStatus();
  
    console.log(" " + userInfo.username)
  
    userInfo 
    $("input[name=user2]").val(userInfo.username)
    $("input[name=status]").val(userInfo.status)
    $("input[name=latitude]").val(userInfo.lat)
    $("input[name=longitude]").val(userInfo.long)
    $("input[name=symptoms]").val(userInfo.symptoms)
    
  //                    $("input#edit_id").val(id)
    $("form#editSympForm").submit()
  })
      

  $("#submitInfo").click(function (e) {
    if ($("#shareLoc").is(":checked"))
    {
          e.preventDefault()

          console.log(userInfo.username + " is submiting their marker")
          console.log("submit info click:" + JSON.stringify(userInfo));
        
          getHealthStatus();
        
          console.log(" " + userInfo.username)
        
          userInfo 
          $("input[name=user2]").val(userInfo.username)
          $("input[name=status]").val(userInfo.status)
          $("input[name=latitude]").val(userInfo.lat)
          $("input[name=longitude]").val(userInfo.long)
          $("input[name=symptoms]").val(userInfo.symptoms)
          
        //                    $("input#edit_id").val(id)
          $("form#submitSympForm").submit()
    }else{
                alert("Please agree to share location first")
                // $("form#submitSympForm").submit(false)
                return false
                
            }
  })
      


