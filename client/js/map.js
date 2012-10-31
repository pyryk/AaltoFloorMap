(function() {
  var apikey = "AIzaSyBWZX8GGfX_4eL1f_EMjP4cr_t-1tj1uRo";
  
  $(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=" + apikey
        + "&sensor=true&callback=initializeMap";
    document.body.appendChild(script);
  });
})();

var initializeMap = function() {
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(60.185433, 24.826012),
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}