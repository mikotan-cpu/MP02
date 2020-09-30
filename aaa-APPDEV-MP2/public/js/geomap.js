


console.log("i am in geomap.js")

let markers = []  



var x = document.getElementById("demo");
var vlat;
var vlong;

var icons = {
  parking: {
    icon: 'marker.png' 
  },
    confirmed: {
    icon: '/../assets/images/confirmed.png'  
    },
    suspect: {
      icon: '/../assets/images/suspect.png' 
    },
    probable: {
      icon: '/../assets/images/probable.png' 
    },
    recovered: {
      icon: '/../assets/images/recovered.png' 
    },
    noSymptoms: {
      icon: '/../assets/images/nosymps.png' 
    
  }
  };
  

function getLocation() {
if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(showPosition);
  
} else { 
 x.innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
x.innerHTML = "Latitude: " + position.coords.latitude + 
"<br>Longitude: " + position.coords.longitude;
 let addLat = Math.random() * 100 / 1000
 let addLong = Math.random() * 100 / 1000
 vlat =  position.coords.latitude + addLat;
 vlong = position.coords.longitude + addLong;
 console.log("original lat: " + vlat + "randomized lat: " + (vlat + addLat))
 console.log(vlat + vlong)

 initMap()
}

 
   var map;
   function initMap() {
     

     $.post('/markers/getMarkers', function(markersStorage){
      map = new google.maps.Map(
        document.getElementById('map'),
        {center: new google.maps.LatLng(14.5831, 120.9794), zoom: 10});

        

      // console.log(JSON.stringify(markersStorage) + "\n" + "geomap")
      for(let i = 0; i < markersStorage.length; i++)
      {
        markers.push({
          lati: markersStorage[i].latitude,
          longi: markersStorage[i].longitude,
          type: markersStorage[i].type,
          username: markersStorage[i].username
        })
        // markers = markersStorage
      }
      for(let i = 0; i< markers.length; i++)
      {
        console.log("asdasds")
        markers[i].position = new google.maps.LatLng(markers[i].lati, markers[i].longi)
      }
      
    
    
      // Create markers.
      console.log("array size: " + markers.length)
      for (var i = 0; i < markers.length; i++) 
      {
        // console.log(icons[markers[4].type].icon)
        var marker = new google.maps.Marker({
          position: markers[i].position,
          icon: icons[markers[i].type].icon,
          map: map
           });
       };
    })

   }

   
 
   var filteredStatus = []
   var unfilteredStatus = []

   $('input[type=checkbox]').on('change', function() {
    if(!$(this).is(':checked'))
    { let filter =  $(this).val()
        filteredStatus.push(filter)
        for(var i = unfilteredStatus.length - 1; i >= 0; i--) {
          if(unfilteredStatus[i] == filter) {
              unfilteredStatus.splice(i, 1);
          }
      }
        filterMap()
}});

$('input[type=checkbox]').on('change', function() {
  if($(this).is(':checked'))
    { let filter =  $(this).val()
        unfilteredStatus.push(filter)
        // filteredStatus = filteredStatus.filter(filter)
        for(var i = filteredStatus.length - 1; i >= 0; i--) {
          if(filteredStatus[i] == filter) {
              filteredStatus.splice(i, 1);
          }
      }
        unfilterMap()
}
});

function filterMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
 
      {center: new  google.maps.LatLng(14.5831, 120.9794), zoom: 10});
      console.log("FILTER() FILTERED")
     
 var icons = {
   parking: {
    icon: 'marker.png' 
   },
   confirmed: {
    icon: '/../assets/images/confirmed.png'  
   },
   suspect: {
     icon: '/../assets/images/suspect.png' 
   },
   probable: {
     icon: '/../assets/images/probable.png' 
   },
   recovered: {
     icon: '/../assets/images/recovered.png' 
   },
   noSymptoms: {
     icon: '/../assets/images/nosymps.png' 
    
  }
  };

  for(let i = 0; i< markers.length; i++)
     {
       console.log("asdasds")
       markers[i].position = new google.maps.LatLng(markers[i].lati, markers[i].longi)
     }
     
  // Create markers.

var gmarkers = []
for (var i = 0; i < markers.length; i++) 
{
   var marker = new google.maps.Marker({
    position: markers[i].position,
    icon: icons[markers[i].type].icon,
    category: markers[i].type,
    map: map
    }); 
    gmarkers.push(marker)
}


for(var j = 0; j < filteredStatus.length; j++) 
{
   
  for (var i = 0; i < gmarkers.length; i++) 
    {
      
      if (filteredStatus[j] == gmarkers[i].category )
       { 
        gmarkers[i].setVisible(false)
        
       }
       
    }
    
 }
 for(var j = 0; j < unfilteredStatus.length; j++) 
{
   
  for (var i = 0; i < gmarkers.length; i++) 
    {
      
      if (unfilteredStatus[j] == gmarkers[i].category )
       { 
        gmarkers[i].setVisible(true)
        
       }
       
    }
    
  }
  
}

function unfilterMap() {
  map = new google.maps.Map(
      document.getElementById('map'),

      {center: new  google.maps.LatLng(14.5831, 120.9794), zoom: 10});

 var icons = {
   parking: {
    icon: 'marker.png' 
   },
   confirmed: {
    icon: '/../assets/images/confirmed.png'  
   },
   suspect: {
     icon: '/../assets/images/suspect.png' 
   },
   probable: {
     icon: '/../assets/images/probable.png' 
   },
   recovered: {
     icon: '/../assets/images/recovered.png' 
   },
   noSymptoms: {
     icon: '/../assets/images/nosymps.png' 
    
  }
  };

  for(let i = 0; i< markers.length; i++)
     {
       console.log("asdasds")
       markers[i].position = new google.maps.LatLng(markers[i].lati, markers[i].longi)
     }
     
  // Create markers.

var gmarkers = []
for (var i = 0; i < markers.length; i++) 
{
   var marker = new google.maps.Marker({
    position: markers[i].position,
    icon: icons[markers[i].type].icon,
    category: markers[i].type,
    map: map
    }); 
    gmarkers.push(marker)
}


for(var j = 0; j < unfilteredStatus.length; j++) 
{
   
  for (var i = 0; i < gmarkers.length; i++) 
    {
      
      if (unfilteredStatus[j] == gmarkers[i].category )
       { 
        gmarkers[i].setVisible(true)
        
       }
       
    }
    
  }
  for(var j = 0; j < filteredStatus.length; j++) 
{
   
  for (var i = 0; i < gmarkers.length; i++) 
    {
      
      if (filteredStatus[j] == gmarkers[i].category )
       { 
        gmarkers[i].setVisible(false)
        
       }
       
    }
    
  }
  // filterMap()
}