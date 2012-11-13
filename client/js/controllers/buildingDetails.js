var BuildingDetailsController = Spine.Controller.sub({
  rawTemplate: $('#building-template'),
  el: $('#buildingDetails'),
  init: function() {
    if (!this.item) {
      throw new Error('Can\'t create a BuildingDetailsController without a building');
    }
    
    this.template = Handlebars.compile(this.rawTemplate.html());
  },
  events: {
    'click h3': 'switchFloor',
    'click #back-button': 'goBack'
  },
  switchFloor: function(e) {
    app.navigateTo(this.item, {floor: $(e.target).attr('data-floor-no')});
  },
  goBack: function(e) {
    app.navigateTo({type: 'map'});
  },
  getData: function(floor) {
    var building = this.item.toJSON();
    for (var i in building.floors) {
      if (building.floors[i].number === floor) {
        building.floors[i].state = 'active';
      } else {
        building.floors[i].state = 'inactive';
      }
    }
    return {device: null, building: building};
  },
  show: function(floor) {
    var data = this.getData(floor);
    this.html(this.template(data));

    for (var i in this.item.floors) {
      new FloorRoomsController({
        building: this.item,
        floor: this.item.floors[i].number,
        el: this.$('.floor-' + this.item.floors[i].number + ' .rooms')
      });
    }

    var device = Device.getDevice();
    if (device && device.building === this.item.id && device.floor === floor) {
      new DeviceController({
        el: this.$('.floor.active .device'),
        item: device
      }).render();
    }

    this.el.show();
  }
  
});