// $("#submitInfo").click(function(){
//     $.post("/getArray", userInfo) });


console.log("i am in symptoms js")
$(document).ready(function () {
  $("input[type=checkbox]").on("change", function () {
    if ($(this).is(":checked")) {
      userInfo.symptoms.push($(this).val());
    }
  });

  var userInfo = {
    symptoms: [],
  };

  $("#submitInfo").click(function () {
    console.log("submit info click:" + JSON.stringify(userInfo));

    for (var i = 0; i < userInfo.symptoms.length; i++) {
      console.log("submit info userinfo: " + userInfo.symptoms[i]);
    }

    console.log("user location: ");
    console.log("lat: " + userInfo.lat);
    console.log("long: " + userInfo.long);
    getHealthStatus();
    var hi = "asds";

    $.ajax({
      type: "POST",
      url: "getArray",
      data: {
        symptoms: userInfo.symptoms,
      },
    });
  });

  // user = [
  //   {
  //   userid: ObjectId(),
  //   username:String,
  //   password:String,
  //   email:String,
  //   latitude:float,
  //   longitude:float,
  //   symptoms :[String],
  //   status:String

  //   }
  //   ]

  // markers = [
  //   {
  //     userid: ObjectId(),
  //     type: String,
  //     latitude: float,
  //     longitude: float
  //   }
  // ]

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
    for (var i = 0; i < userInfo.symptoms.length; i++) {
      if (userInfo.symptoms[i] == "positve") {
        console.log("user is positive");
        status = "confirmed";
      } else if (userInfo.symptoms[i] == "noSymptoms") {
        status = "noSymptoms";
      } else if (userInfo.symptoms[i] == "recovered") {
        status = "recovered";
      } else if (
        userInfo.symptoms[i] == "traveled" ||
        userInfo.symptoms[i] == "contact" ||
        userInfo.symptoms[i] == "contact"
      ) {
        status = "suspect";
      }
    }
    console.log("get health status: " + status);
  }
});
