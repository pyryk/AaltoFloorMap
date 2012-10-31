var Device = Spine.Model.sub();
Device.configure('Device', 'type', 'location');

Device.include({
  getLocation: function() {
    return this.location; // TODO use geolocation api if necessary
  }
});