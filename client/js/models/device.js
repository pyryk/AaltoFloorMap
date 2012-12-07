var Device = Spine.Model.sub();
Device.configure('Device', 'type', 'method', 'building', 'floor', 'top', 'left', 'location');

Device.include({
  type: 'device',
  getLocation: function() {
    // if building is set for this device, use its location
    if (this.building) {
      var building = Building.find(this.building);
      return {latitude: building.location[0], longitude: building.location[1]};
    }

    return this.location;
  },
  persist: function() {
  	localStorage['AaltoFloorMaps-device-building'] = this.building;
  	localStorage['AaltoFloorMaps-device-floor'] = this.floor;
  	localStorage['AaltoFloorMaps-device-top'] = this.top;
  	localStorage['AaltoFloorMaps-device-left'] = this.left;
  },
  updateLocation: function() {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(this.proxy(function(location) {
      this.location = location.coords;
      this.save();
      Spine.trigger('location:changed', this.location);
    }), 
    function() {console.warn('Could not get device location')},
    {
      enableHighAccuracy: true,
      maximumAge: 60000,
      timeout: 45000
    });
  }
});

Device.extend({
  initialize: function(building, floor, top, left) {
    var device = Device.getDevice();

    device.building = building;
    device.floor = floor;
    device.top = top;
    device.left = left;

    device.save();
    device.persist();
    console.log('Device initialized');
  }
  getDevice: function() {
    var building, floor, top, left, type;
  	var device = Device.first();
  	if (!device) {
  		building = localStorage['AaltoFloorMaps-device-building'];
  		floor = parseInt(localStorage['AaltoFloorMaps-device-floor']);
  		top = parseInt(localStorage['AaltoFloorMaps-device-top']);
  		left = parseInt(localStorage['AaltoFloorMaps-device-left']);

      device = Device.create({
        building: building,
        floor: floor,
        top: top,
        left: left
      });

  		if (!building || !floor || !top || !left) {
  			console.warn('Couldnt find the needed device data in the localstorage.')
        device.method = 'geolocation';
        device.save();
        device.updateLocation();
        setInterval(device.proxy(device.updateLocation), 5000)
  		} else {
        device.method = 'manual';
        device.save();
      }
      

  	}
    return device;
  }
});