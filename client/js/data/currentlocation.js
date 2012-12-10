if (navigator.geolocation) {
     
    var options = {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 45000
    };
 
    // successCallback
    function successHandler (position) {
		var map = Map.getMap();
        //var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var aalto_coords = new google.maps.LatLng(60.186833,24.821763);
		alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
		var image = new google.maps.MarkerImage('images/pin.png');
		var marker = new google.maps.Marker({
			position:aalto_coords,
			map: map.mapComponent,
			title:"You are here!",
			icon:image
		}); 
	}
 
    // errorCallback
    function errorHandler (error) {
        alert('Attempt to get location failed: ' + error.message);
    }
 
    // Get the User Position
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
}
else {
    alert("Sorry, your browser not support Geolocation API.");
}