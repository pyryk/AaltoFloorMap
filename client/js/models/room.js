var Room = Spine.Model.sub();
Room.configure('Room', 'name', 'building', 'floor', 'location');

Room.include({
  type: 'room'
});