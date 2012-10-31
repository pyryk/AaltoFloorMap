var Map = Spine.Model.sub();
Map.configure('Map', 'location', 'zoomlevel');

Map.include({
  panTo: function(locatable) {
    // should pan to the locatable
  } 
});