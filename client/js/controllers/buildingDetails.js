var BuildingDetailsController = Spine.Controller.sub({
  rawTemplate: $('#building-template'),
  init: function() {
    if (!this.item) {
      throw new Error('Can\'t create a BuildingDetailsController without a building');
    }
    
    this.el = $('<div id="buildingDetails"></div>');
    this.parent.append(this.el);
    this.template = Handlebars.compile(this.rawTemplate.html());
  },
  getData: function() {
    return {device: null, building: this.item.toJSON()};
  },
  show: function() {
    var data = this.getData();
    this.html(this.template(data));
    
    this.el.show();
  }
  
});