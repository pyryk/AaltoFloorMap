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
      left: 170, // pixels
      roomType: 'student-room'
    },
    {
      name: 'Amica TUAS',
      building: 'tuas',
      floor: 1,
      top: 630,
      left: 340, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'TU1',
      building: 'tuas',
      floor: 1,
      top: 430,
      left: 410, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'TU2',
      building: 'tuas',
      floor: 2,
      top: 430,
      left: 410, // pixels
      roomType: 'lecture-hall'
    }
  ];
  
  for(var i in roomdata) {
    Room.create(roomdata[i]);
  }
})();