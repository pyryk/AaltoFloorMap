(function(){
  var roomdata = [
    {
      name: 'Paniikki',
      building: 't',
      floor: 1,
      location: [500, 100] // pixels [x, y]
    }
  ];
  
  for(var i in roomdata) {
    Room.create(roomdata[i]);
  }
})();