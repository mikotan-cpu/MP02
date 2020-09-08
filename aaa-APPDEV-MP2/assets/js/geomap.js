 
        var x = document.getElementById("demo");
        var lat;
        var long;
                
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
            
            lat =  position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat + long)
            initMap()
        }
                
              var map;
              function initMap() {
                map = new google.maps.Map(
                    document.getElementById('map'),
                    {center: new google.maps.LatLng(12.8797, 121.7740), zoom: 8});
        
                var iconBase =
                    'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
        
                var icons = {
                  parking: {
        //            icon: iconBase + 'parking_lot_maps.png'
                      icon: 'marker.png'
                  },
                  library: {
                    icon: iconBase + 'library_maps.png'
                  },
                  info: {
                    icon: iconBase + 'info-i_maps.png'
                  }
                };
        
        //          lat= 14.627178
        //long= 121.099731
                var features = [
                  {
                      
                      
                    position: new google.maps.LatLng(lat, long),
                    type: 'parking'
                  }
                ];
        
                // Create markers.
                for (var i = 0; i < features.length; i++) {
                  var marker = new google.maps.Marker({
                    position: features[i].position,
                    icon: icons[features[i].type].icon,
                    map: map
                  });
                };
              }
        
                