var initializeMap = function() {
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(60.185433, 24.826012),
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}