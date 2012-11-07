var RoomController = Spine.Controller.sub({
	events: {
		'click .room-marker': 'clicked'
	},
	init: function() {
	this.item.bind("update", this.proxy(this.render));
  this.template = Handlebars.compile($('#room-template').html());
	},
	clicked: function(e) {
		console.log('clicked ' + this.item.name);
		window.app.navigateTo(this.item);
	},
	getData: function() {
		return {className: this.active, room: this.item};
	},
	render: function() {
		var data = this.getData();
    this.html(this.template(data));
    return this;
	}
});