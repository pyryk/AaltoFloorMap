var SidebarController = Spine.Controller.sub({
	init: function() {
		this.item.bind('change', this.proxy(this.render));
		this.template = Handlebars.compile($('#sidebar-template').html());
	},
	getData: function() {
		return {data: this.item.toJSON()}
	},
	render: function() {
		var data = this.getData();

		this.html(this.template(data));

		this.$('.qrcode').empty().qrcode(this.item.url);
	}
});