var BuildingDetailsController = Spine.Controller.sub({
  rawTemplate: $('#building-template'),
  el: $('#buildingDetails'),
  currentFloor: undefined,
  redrawNeeded: true,
  init: function() {
    if (!this.item) {
      throw new Error('Can\'t create a BuildingDetailsController without a building');
    }
    
    this.template = Handlebars.compile(this.rawTemplate.html());
  },
  events: {
    'click h3': 'switchFloor',
    'click .zoomIn': 'zoomIn',
    'click .zoomOut': 'zoomOut'
  },
  setBuilding: function(building) {
    if (building.id !== this.item.id) {
      this.item = building;
      this.redrawNeeded = true;
    }
  },
  switchFloor: function(e) {
    app.navigateTo(this.item, {floor: $(e.target).attr('data-floor-no')});
  },
  zoomIn: function() {
    this.zoom(0.1);
  },
  zoomOut: function() {
    this.zoom(-0.1);
  },
  zoom: function(amount) {
    var el = this.$('.floor.active .floorplan-wrapper');
    var currentZoom = parseFloat(el.css('zoom'));

    // with ff currentZoom is NaN when not explicitly set
    if (!currentZoom) {
      currentZoom = 1;
    }

    el.css('zoom', currentZoom + amount);
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
    this.redrawNeeded = false;

    var data = this.getData(floor);
    this.html(this.template(data));

    this.floorsEl = this.$('#floors');

    for (var i in this.item.floors) {
      new FloorRoomsController({
        building: this.item,
        buildingController: this,
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
      startZoom = parseFloat(this.$('.floor.active .floorplan-wrapper').css('zoom'));
      hammer.ondragstart(ev);
    });
    hammer.ontransform = this.proxy(function(ev) { 
      this.$('.floor.active .floorplan-wrapper').css('zoom', startZoom * ev.scale);
      hammer.ondrag(ev);
    });
    hammer.ondragstart = this.proxy(function(ev) {
      startpos = {x: this.$('.floor.active .floorplan-data').scrollLeft(), y: this.$('.floor.active .floorplan-data').scrollTop()};
    });
    hammer.ondrag = this.proxy(function(ev) { 
      var top = -ev.distanceY + startpos.y;
      var left = -ev.distanceX + startpos.x;
      this.$('.floor.active .floorplan-data').scrollTo({top: top, left: left})
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

    // pan to the active room
    var active = Room.findActive();
    if (active) {
      this.scrollTo(active);
    }
  },
  scrollTo: function(active) {
    var scrollable = this.$('.floor-' + this.currentFloor + ' > .floorplan-data');
    var offset = scrollable.find('.floorplan-wrapper').offset();

    var scrollTop = scrollable.scrollTop();
    var scrollLeft = scrollable.scrollLeft();

    var offsetTop = active.top < scrollTop ? -50 : 50;
    var offsetLeft = active.left < scrollLeft ? -50 : 50;

    scrollable.scrollTo({top: active.top + offsetTop, left: active.left + offsetLeft}, 500);
  }
  
});