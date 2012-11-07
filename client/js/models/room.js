var Room = Spine.Model.sub();
Room.configure('Room', 'name', 'building', 'floor', 'top', 'left', 'roomType', 'active');

// possible room types here:
// * lecture-hall
// * computer-lab
// * student-room
// * cafeteria
// * toilet
// * room (default)

Room.include({
  type: 'room',
  active: false,
  toggleActive: function() {
  	Room.each(this.proxy(function(room) {
  		if (room.id !== this.id && room.active) {
  			room.active = false;
  			room.save();
  		}
  	}));
  	this.active = !this.active;
  	this.save();
  }
});

Room.extend({
	findByBuilding: function(building, floor) {
		var rooms = Room.findAllByAttribute('building', building.id);

		if (!floor) {
			return rooms;
		}

		// if floor is specified, filter by it
		var roomsOnFloor = [];
		for(var i in rooms) {
			if (rooms[i].floor === floor) {
				roomsOnFloor.push(rooms[i])
			}
		}
		return roomsOnFloor;
	},
	deactivateAll: function() {
		var rooms = Room.findAllByAttribute('active', true);
		for (var i in rooms) {
			rooms[i].active = false;
			rooms[i].save();
		}
	},
	find: function(building, name) {
		if (!name) { // compatibility to normal find()
			return Spine.Model.find.call(this, building);
		}

		var rooms = Room.findByBuilding(building);

		for (var i in rooms) {
			if (rooms[i].name.toLowerCase() === name.toLowerCase()) {
				return rooms[i];
			}
		}

		return null;
	}
});