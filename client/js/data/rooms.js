(function(){
  var roomdata = [
    {
      name: 'Paniikki',
      building: 't',
      floor: 1,
      top: 200,
      left: 800, // pixels
      roomType: 'computer-lab'
    },
    {
      name: 'T1',
      building: 't',
      floor: 2,
      top: 200,
      left: 800, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'OLOhuone',
      building: 't',
      floor: 1,
      top: 420,
      left: 500, // pixels
      roomType: 'student-room'
    }
  ];
  
  for(var i in roomdata) {
    Room.create(roomdata[i]);
  }
})();