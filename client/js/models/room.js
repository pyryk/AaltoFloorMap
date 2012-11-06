var Room = Spine.Model.sub();
Room.configure('Room', 'name', 'building', 'floor', 'top', 'left');

Room.include({
  type: 'room'
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
	}
});