var RoomController = Spine.Controller.sub({
	events: {
		'click .room-marker': 'clicked'
	},
	init: function() {
	this.item.bind("update", this.proxy(this.render));
  this.template = Handlebars.compile($('#room-template').html());
	},
	clicked: function(e) {
		if (this.item.active) { // deselect the room
			window.app.navigateTo(Building.find(this.item.building), {floor: this.item.floor});
		} else {
			window.app.navigateTo(this.item);
		}
	},
	getData: function() {
		return {className: this.active, room: this.item, icon: this.item.getIcon()};
	},
	render: function() {
		var data = this.getData();
    this.html(this.template(data));
    return this;
	}
});