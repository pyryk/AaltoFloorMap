var Device = Spine.Model.sub();
Device.configure('Device', 'type', 'position');

Device.include({
  getPosition: function() {
    return this.position; // TODO use geolocation api if necessary
  }
});