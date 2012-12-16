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
			var room = Room.find(value.replace('room-',''));
			room.shouldBounce = true;
			room.save();
			window.app.navigateTo(room);
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

		this.$('.searchfield').select2({matcher: function(term, text, opt) {
			if (term === '') {
				return true;
			}

			if (text.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
				return true;
			}

			var type = RoomTypes[opt.attr('data-type')];
			if (type) {
				return type.toUpperCase().indexOf(term.toUpperCase()) >= 0
			}

			return false;
		}});
	}
});