var MapController = Spine.Controller.sub({
  el: $('#map-wrapper'),
  init: function() {
    var defaultCampus = Campus.getDefault();
    var map = Map.create({location: defaultCampus.location, zoomlevel: defaultCampus.zoomlevel});

    var mapOptions = {
      zoom: map.zoomlevel,
      center: new google.maps.LatLng(map.location[0], map.location[1]),
      mapTypeId: google.maps.MapTypeId.HYBRID,
      zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL}
    }
    map.mapComponent = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.save();

    // init geolocation
    // var device = Device.getDevice();
    // this.addLocationMarker(device);
    Building.bind('create', this.proxy(this.addMarker));
    this.addAllMarkers();
    this.show();
  },
  addMarker: function(item) {
    new BuildingController({item: item});
  },
  // addLocationMarker: function(device) {
    // var map = Map.getMap();
    // var image = new google.maps.MarkerImage('images/pin.png');

    // if (device.getLocation()) {
      // var coords = new google.maps.LatLng(device.getLocation().latitude, device.getLocation().longitude);
      // var marker = new google.maps.Marker({
        // position:coords,
        // map: map.mapComponent,
        // title:"You are here!",
        // icon:image,
        // clickable: false,
        // zIndex: 10
      // });
    // }

    // Spine.bind('location:changed', function() {
      // if (!marker) {
        // var marker = new google.maps.Marker({
          // position:coords,
          // map: map.mapComponent,
          // title:"You are here!",
          // icon:image,
          // clickable: false,
          // zIndex: 10
        // });
      // }

      // var coords = new google.maps.LatLng(device.location.latitude, device.location.longitude);
      // marker.setPosition(coords);
    // });

  // },
  addAllMarkers: function() {
    Building.each(this.proxy(this.addMarker));
  },
  show: function() {
    this.el.siblings().hide();
    this.el.show();
  }
});