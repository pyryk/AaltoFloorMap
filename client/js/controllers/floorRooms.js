var FloorRoomsController = Spine.Controller.sub({
  init: function(){
    Room.bind("refresh", this.proxy(this.addAll));
    Room.bind("create",  this.proxy(this.addOne));

    this.addAll();
  },

  addOne: function(item){
    if (item.building === this.building.id && item.floor === this.floor) {
      var room = new RoomController({item: item});
      this.append(room.render());
    } else {
      console.log('not in this building');
    }
  },

  addAll: function(){
    Room.each(this.proxy(this.addOne));
    console.log('added rooms to ', this.el);
  }
}); 