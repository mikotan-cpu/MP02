console.log("i am in geomap.js")

var x = document.getElementById("demo");
var vlat;
var vlong;

console.log("i am in geomap.js")

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
 
 vlat =  position.coords.latitude;
 vlong = position.coords.longitude;
 console.log(vlat + vlong)

 initMap()
}

 
   var map;
   function initMap() {
     map = new google.maps.Map(
         document.getElementById('map'),
         {center: new google.maps.LatLng(14.6037, 121.3084), zoom: 8});

     var iconBase =
         'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

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

       var alati = 16.131400;
       var alongi = 124.858482;
   let markers = [ 
     {
         position: new google.maps.LatLng(vlat, vlong),
         type: 'confirmed' 
     },
     
     {
      
       position: new google.maps.LatLng(8.477217, 124.645920),
         type: 'suspect'
     }
       ,
     {
       type: 'probable',
       position: new google.maps.LatLng(10.753794, 123.084160)
     },
     {
       type: 'probable',
       position: new google.maps.LatLng(14.558555, 121.136086)
     },
     {
       type: 'noSymptoms',
         position: new google.maps.LatLng(10.503405, 122.966301)
     },
     {
       type:'recovered',
        position: new google.maps.LatLng(4.998451, 120.953209)
     },
     {
       type:'probable',
        position: new google.maps.LatLng(	6.116243, 125.171738)
     },
     {
       type:'probable',
        position: new google.maps.LatLng(	14.247142, 121.136673)
     },
     {
       type:'noSymptoms',
        position: new google.maps.LatLng(	14.309243, 121.031708)
     },
     {
       type:'noSymptoms',
        position: new google.maps.LatLng(	14.192048, 121.131180)
     },
     {
       type:'noSymptoms',
        position: new google.maps.LatLng(		14.537752, 121.001381)
     },
     {
       type:'recovered',
        position: new google.maps.LatLng(		14.115286, 120.962112)
     },
     {
       type:'recovered',
        position: new google.maps.LatLng(		13.941876, 121.164421)
     },
     {
       type:'recovered',
        position: new google.maps.LatLng(		13.941876, 121.164421)
     },
     {
       type:'recovered',
        position: new google.maps.LatLng(			14.083507, 121.147354)
     },
     {
       type:'noSymptoms',
        position: new google.maps.LatLng(			10.266182, 123.997292)
     },
     {
       type:'noSymptoms',
        position: new google.maps.LatLng(			14.625483, 121.124481)
     },
     {
       type:'noSymptoms',
        position: new google.maps.LatLng(				8.130604, 125.127655)
     },
     {
       type:'confirmed',
        position: new google.maps.LatLng(				7.056601, 124.676239)
     },
     {
       type:'confirmed',
        position: new google.maps.LatLng(				14.408133, 121.041466)
     },
     {
       type:'confirmed',
        position: new google.maps.LatLng(				15.090024, 120.662842)
     },
     {
       type:'confirmed',
        position: new google.maps.LatLng(				14.676208	, 121.043861)
     },
     {
       type:'suspect',
        position: new google.maps.LatLng(				15.156311	, 120.591774)
     },
     {
       type:'probable',
        position: new google.maps.LatLng(					9.740696	, 118.730072)
     },
     {
       type:'confirmed',
        position: new google.maps.LatLng(					16.0832	, 120.6200)
     },
     {
       type:'noSymptoms',
        position: new google.maps.LatLng(					17.6132	, 121.7270)
     },
     {
       type:'noSymptoms',
        position: new google.maps.LatLng(					17.5705	, 120.3873)
     },
     {
       type:'recovered',
        position: new google.maps.LatLng(					17.0981	, 120.9073)
     }
   ]  
     
  

     // Create markers.
   console.log("array size: " + markers.length)
     for (var i = 0; i < markers.length; i++) 
     {
       var marker = new google.maps.Marker({
         position: markers[i].position,
         icon: icons[markers[i].type].icon,
         map: map
          });
      };
   }
 
   var filteredStatus = []
   var unfilteredStatus = []

   $('input[type=checkbox]').on('change', function() {
    if($(this).is(':checked'))
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
  if(!$(this).is(':checked'))
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
      {center: new google.maps.LatLng(14.6037, 121.3084), zoom: 8});
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

let markers = [ 
  {
      position: new google.maps.LatLng(vlat, vlong),
      type: 'confirmed' 
  },
  {
     position: new google.maps.LatLng(8.477217, 124.645920),
      type: 'suspect'
  }
    ,
  {
    type: 'probable',
    position: new google.maps.LatLng(10.753794, 123.084160)
  },
  {
    type: 'probable',
    position: new google.maps.LatLng(14.558555, 121.136086)
  },
  {
    type: 'noSymptoms',
      position: new google.maps.LatLng(10.503405, 122.966301)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(4.998451, 120.953209)
  },
  {
    type:'probable',
     position: new google.maps.LatLng(	6.116243, 125.171738)
  },
  {
    type:'probable',
     position: new google.maps.LatLng(	14.247142, 121.136673)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(	14.309243, 121.031708)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(	14.192048, 121.131180)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(		14.537752, 121.001381)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(		14.115286, 120.962112)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(		13.941876, 121.164421)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(		13.941876, 121.164421)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(			14.083507, 121.147354)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(			10.266182, 123.997292)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(			14.625483, 121.124481)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(				8.130604, 125.127655)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(				7.056601, 124.676239)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(				14.408133, 121.041466)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(				15.090024, 120.662842)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(				14.676208	, 121.043861)
  },
  {
    type:'suspect',
     position: new google.maps.LatLng(				15.156311	, 120.591774)
  },
  {
    type:'probable',
     position: new google.maps.LatLng(					9.740696	, 118.730072)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(					16.0832	, 120.6200)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(					17.6132	, 121.7270)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(					17.5705	, 120.3873)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(					17.0981	, 120.9073)
  }
]  
  
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
      {center: new google.maps.LatLng(14.6037, 121.3084), zoom: 8});

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

let markers = [ 
  {
      position: new google.maps.LatLng(vlat, vlong),
      type: 'confirmed' 
  },
  {
     position: new google.maps.LatLng(8.477217, 124.645920),
      type: 'suspect'
  }
    ,
  {
    type: 'probable',
    position: new google.maps.LatLng(10.753794, 123.084160)
  },
  {
    type: 'probable',
    position: new google.maps.LatLng(14.558555, 121.136086)
  },
  {
    type: 'noSymptoms',
      position: new google.maps.LatLng(10.503405, 122.966301)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(4.998451, 120.953209)
  },
  {
    type:'probable',
     position: new google.maps.LatLng(	6.116243, 125.171738)
  },
  {
    type:'probable',
     position: new google.maps.LatLng(	14.247142, 121.136673)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(	14.309243, 121.031708)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(	14.192048, 121.131180)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(		14.537752, 121.001381)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(		14.115286, 120.962112)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(		13.941876, 121.164421)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(		13.941876, 121.164421)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(			14.083507, 121.147354)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(			10.266182, 123.997292)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(			14.625483, 121.124481)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(				8.130604, 125.127655)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(				7.056601, 124.676239)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(				14.408133, 121.041466)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(				15.090024, 120.662842)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(				14.676208	, 121.043861)
  },
  {
    type:'suspect',
     position: new google.maps.LatLng(				15.156311	, 120.591774)
  },
  {
    type:'probable',
     position: new google.maps.LatLng(					9.740696	, 118.730072)
  },
  {
    type:'confirmed',
     position: new google.maps.LatLng(					16.0832	, 120.6200)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(					17.6132	, 121.7270)
  },
  {
    type:'noSymptoms',
     position: new google.maps.LatLng(					17.5705	, 120.3873)
  },
  {
    type:'recovered',
     position: new google.maps.LatLng(					17.0981	, 120.9073)
  }
]  
  
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