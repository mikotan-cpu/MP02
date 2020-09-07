
console.log("symptoms js")
$('input[type=checkbox]').on('change', function() {
    if($(this).is(':checked'))
    { 
        // let filter =  $(this).val()
        //   unfilteredStatus.push(filter)
        //   // filteredStatus = filteredStatus.filter(filter)
        //   for(var i = filteredStatus.length - 1; i >= 0; i--) {
        //     if(filteredStatus[i] == filter) {
        //         filteredStatus.splice(i, 1);
        //     }
        // }
        //   unfilterMap()
        console.log($(this).val())
        console.log("username: " + session.username)
    }
  });

  $('input[value=share  ]').on('change', function() {
    if($(this).is(':checked'))
    { 
        // let filter =  $(this).val()
        //   unfilteredStatus.push(filter)
        //   // filteredStatus = filteredStatus.filter(filter)
        //   for(var i = filteredStatus.length - 1; i >= 0; i--) {
        //     if(filteredStatus[i] == filter) {
        //         filteredStatus.splice(i, 1);
        //     }
        // }
        //   unfilterMap()
        console.log("user agreed to share location")
        getLocation()
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
    console.log("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude)
      
      let lat =  position.coords.latitude;
      let long = position.coords.longitude;
      console.log(lat + long)
    //   initMap()

 
  }
