var RoomController = Spine.Controller.sub({
	init: function() {
	this.item.bind("update", this.proxy(this.render));
  this.template = Handlebars.compile($('#room-template').html());
	},
	getData: function() {
		return {room: this.item};
	},
	render: function() {
		var data = this.getData();
    this.html(this.template(data));
    return this;
	}
});