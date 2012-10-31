var Map = Spine.Model.sub();
Map.configure('Map', 'location', 'zoomlevel', 'mapComponent');

Map.include({
  panTo: function(locatable) {
    // should pan to the locatable
  } 
});

Map.extend({
  getMap: function() {
    return this.first();
  }
});