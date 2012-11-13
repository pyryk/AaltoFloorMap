var BuildingController = Spine.Controller.sub({
  init: function() {
    if (!this.item) {
      throw new Error('Can\'t create a buildingcontroller without a building');
    }
    
    this.render();
  },
  render: function() {
    if (this.marker) {
      // do other stuff
    }
    
    var map = Map.getMap();
    
    this.marker = new google.maps.Marker({
          position: this.item.getLatLng(),
          map: map.mapComponent,
          title:this.item.name
    });
    
    google.maps.event.addListener(this.marker, 'click', this.proxy(this.clicked))
  },
  clicked: function() {
    app.navigateTo(this.item);
  }
});