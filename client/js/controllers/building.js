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
    
    console.log('creating a marker');
    var map = Map.getMap();
    
    this.marker = new google.maps.Marker({
          position: this.item.getLatLng(),
          map: map.mapComponent,
          title:this.item.name
    });
    
    google.maps.event.addListener(this.marker, 'click', this.proxy(this.clicked))
  },
  clicked: function() {
    console.log(this.item.name + ' clicked!');
    app.navigateTo(this.item);
  }
});