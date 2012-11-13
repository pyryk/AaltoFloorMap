var BuildingDetailsController = Spine.Controller.sub({
  rawTemplate: $('#building-template'),
  el: $('#buildingDetails'),
  currentFloor: undefined,
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
  setBuilding: function(building) {
    this.item = building;
    this.redrawNeeded = true;
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
    if (!this.redrawNeeded && floor === this.currentFloor) {
      this.el.show();
      return; // no need to redraw, this saves us from missing the scroll positions etc.
    }
    this.currentFloor = floor;

    var data = this.getData(floor);
    this.html(this.template(data));

    this.floorsEl = this.$('#floors');

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

    var startpos = {};
    var startzoom = 1;
    var hammer = new Hammer(document.getElementById("floors"), {prevent_default:true, drag_min_distance: 20});
    hammer.ontransformstart = this.proxy(function(ev) { 
      startZoom = parseFloat(this.floorsEl.css('zoom'));
      hammer.ondragstart(ev);
    });
    hammer.ontransform = this.proxy(function(ev) { 
      this.floorsEl.css('zoom', startZoom * ev.scale);
      hammer.ondrag(ev);
    });
    hammer.ondragstart = this.proxy(function(ev) {
      startpos = {x: this.el.scrollLeft(), y: this.el.scrollTop()};
    });
    hammer.ondrag = this.proxy(function(ev) { 
      var top = -ev.distanceY + startpos.y;
      var left = -ev.distanceX + startpos.x;
      this.el.scrollTo({top: top, left: left})
      return false;
    });

    // workaround for untriggered click events with hammer+prevent_default
    // + workaround for the 200ms click delay
    hammer.ontap = this.proxy(function(ev) { 
      if (!ev.originalEvent.type !== "mousedown") {
        $(ev.originalEvent.target).click();
      }
    });

    this.el.show();
  }
  
});