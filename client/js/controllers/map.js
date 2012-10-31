var MapController = Spine.Controller.sub({
  init: function() {
    var defaultCampus = Campus.getDefault();
    var map = Map.create({location: defaultCampus.location, zoomlevel: defaultCampus.zoomlevel});

    var mapOptions = {
      zoom: map.zoomlevel,
      center: new google.maps.LatLng(map.location[0], map.location[1]),
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    map.mapComponent = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.save();
    
    Building.bind('create', this.proxy(this.addMarker));
    this.addAllMarkers();
  },
  addMarker: function(item) {
    new BuildingController({item: item});
  },
  addAllMarkers: function() {
    Building.each(this.proxy(this.addMarker));
  }
});