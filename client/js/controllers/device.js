var DeviceController = Spine.Controller.sub({
	init: function() {
		this.item.bind("update", this.proxy(this.render));
  	this.template = Handlebars.compile($('#device-template').html());
	},
	getData: function() {
		return {device: this.item};
	},
	render: function() {
		var data = this.getData();
    this.html(this.template(data));
    return this;
	}
});