var Campus = Spine.Model.sub();
Campus.configure('Campus', 'name', 'location', 'zoomlevel', 'default');

Campus.include({
  type: 'campus'
});

Campus.extend({
  getDefault: function() {
    return this.findByAttribute('default', true);
  }
});