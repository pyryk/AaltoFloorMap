var Device = Spine.Model.sub();
Device.configure('Device', 'type', 'location');

Device.include({
  type: 'device',
  getLocation: function() {
    return this.location; // TODO use geolocation api if necessary
  }
});

Device.extend({
  getDevice: function() {
    return null;
  }
});