var BackButtonController = Spine.Controller.sub({
	app: undefined,
	previous: undefined,
	events: {
		'click': 'clicked'
	},
	init: function() {
		Spine.bind('page:changed', this.proxy(function(page, app, previous) {
			this.app = app;
			this.previous = previous;
			this.render();
		}));

  	this.template = Handlebars.compile($('#backbutton-template').html());
	},
	getData: function() {
		return {previous: this.previous};
	},
	render: function() {
		var data = this.getData();
    this.html(this.template(data));

    return this;
	},
	clicked: function(e) {
		this.app.navigateTo(this.previous);
	}
});