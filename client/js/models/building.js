var Building = Spine.Model.sub();
Building.configure('Building', 'name', 'location', 'floors');

Building.include({
  getLatLng: function() {
    return new google.maps.LatLng(this.location[0], this.location[1]);
  }
});