var Room = Spine.Model.sub();
Room.configure('Room', 'name', 'building', 'floor', 'top', 'left', 'roomType', 'active', 'shouldBounce');

// possible room types here:
// * lecture-hall
// * computer-lab
// * student-room
// * cafeteria
// * toilet
// * library
// * meeting-room
// * room (default)

var RoomTypes = {
	'lecture-hall': 'Lecture hall',
  'computer-lab': 'Computer lab',
  'student-room': 'Student room',
  'cafeteria': 'Cafeteria',
  'toilet': 'Toilet',
  'library': 'Library',
  'meeting-room': 'Meeting Room'
}

Room.include({
  type: 'room',
  active: false,
  shouldBounce: true,
  toggleActive: function() {
  	Room.each(this.proxy(function(room) {
  		if (room.id !== this.id && room.active) {
  			room.active = false;
  			room.save();
  		}
  	}));
  	this.active = !this.active;
  	this.save();

  	Room.trigger('activechanged', this.active ? this : undefined);
  },
  getIcon: function() {
  	return Room.getIconByType(this.roomType);
  },
  getRoomTypeLabel: function() {
  	return RoomTypes[this.roomType] ? RoomTypes[this.roomType] : 'Room';
  }
});

Room.extend({
	getIconByType: function(type) {
		var imgPath = 'images/icons/';
  	return imgPath + type + '.png';
	},
	findActive: function() {
		return Room.findByAttribute('active', true);
	},
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
		Room.trigger('activechanged', undefined);
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