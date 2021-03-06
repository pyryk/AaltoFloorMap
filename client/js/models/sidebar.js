var Sidebar = Spine.Model.sub();

Sidebar.configure('Sidebar', 'url', 'room');

Sidebar.include({
	toJSON: function() {
		var data = Spine.Model.prototype.toJSON.call(this);
		if (data.room) {
			var typeLabel = data.room.getRoomTypeLabel();
			var icon = data.room.getIcon();
			data.room = data.room.toJSON();
			data.room.typeLabel = typeLabel;
			data.room.icon = icon;

			try {
				data.room.building = Building.find(data.room.building).toJSON();
			} catch (e) {
				console.warn('Couldnt find building ' + data.room.building);
			}
			
		}

		data.roomTypes = [];

		for(var key in RoomTypes) {
			data.roomTypes.push({name: RoomTypes[key], icon: Room.getIconByType(key)});
		}

		return data;
	}
});

Sidebar.extend({

	// sidebar's url property always reacts to hashchange events
	create: function(props) {
		var it = Spine.Model.create.apply(this, arguments);
		it.url = document.URL;
		it.save();
		Spine.bind('hashchange', it.proxy(function(hash, url) {
			this.url = url;
			this.save();
		}));

		Room.bind('activechanged', it.proxy(function(active) {
			this.room = active;
			this.save();
		}));

		return it;
	}
});