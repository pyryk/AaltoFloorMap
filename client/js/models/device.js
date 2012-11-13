var Device = Spine.Model.sub();
Device.configure('Device', 'type', 'building', 'floor', 'top', 'left');

Device.include({
  type: 'device',
  getLocation: function() {
    return this.location; // TODO use geolocation api if necessary
  },
  persist: function() {
  	localStorage['AaltoFloorMaps-device-building'] = this.building;
  	localStorage['AaltoFloorMaps-device-floor'] = this.floor;
  	localStorage['AaltoFloorMaps-device-top'] = this.top;
  	localStorage['AaltoFloorMaps-device-left'] = this.left;
  }
});

Device.extend({
  getDevice: function() {
  	var device = Device.first();
  	if (!device) {
  		var building = localStorage['AaltoFloorMaps-device-building'];
  		var floor = parseInt(localStorage['AaltoFloorMaps-device-floor']);
  		var top = parseInt(localStorage['AaltoFloorMaps-device-top']);
  		var left = parseInt(localStorage['AaltoFloorMaps-device-left']);
  		if (!building || !floor || !top || !left) {
  			console.warn('Couldnt find the needed device data in the localstorage.')
  			return undefined;
  		}

  		device = Device.create({
  			building: building,
  			floor: floor,
  			top: top,
  			left: left
  		});

  	}
    return device;
  }
});