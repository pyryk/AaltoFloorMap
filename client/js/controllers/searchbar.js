var SearchbarController = Spine.Controller.sub({
	events: {
		'change .searchfield': 'search'
	},
	init: function() {
		Room.bind('add update', this.proxy(this.render));
		Building.bind('add update', this.proxy(this.render));

		this.template = Handlebars.compile($('#searchbar-template').html());
	},
	search: function(e) {
		var value = $(e.target).val();
		if (value.indexOf('building-') == 0) {
			window.app.navigateTo(Building.find(value.replace('building-','')));
		} else if (value.indexOf('room-') == 0) {
			window.app.navigateTo(Room.find(value.replace('room-','')));
		}
	},
	getData: function() {
		var rooms = Room.all();
		var formattedRooms = [];
		for (var i in rooms) {
			var data = rooms[i].toJSON();
			data.building = Building.find(data.building);
			formattedRooms.push(data);
		}
		var buildings = Building.all();

		return {buildings: buildings, rooms: formattedRooms};
	},
	render: function() {
		var data = this.getData();
		this.html(this.template(data));

		this.$('.searchfield').chosen({no_results_text: "No room or buildings found"});
	}
});