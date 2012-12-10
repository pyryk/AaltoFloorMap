(function(){
  var roomdata = [

    // T
    {
      name: 'Paniikki',
      building: 't',
      floor: 1,
      top: 264,
      left: 1230, // pixels
      roomType: 'computer-lab'
    },
    {
      name: 'T1',
      building: 't',
      floor: 2,
      top: 280,
      left: 1235, // pixels
      roomType: 'lecture-hall'
    },
	{
      name: 'T1',
      building: 't',
      floor: 3,
      top: 530,
      left: 3125, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'T2',
      building: 't',
      floor: 1,
      top: 470,
      left: 1090, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'T3',
      building: 't',
      floor: 2,
      top: 480,
      left: 1090, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'T5',
      building: 't',
      floor: 1,
      top: 505,
      left: 490, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'T6',
      building: 't',
      floor: 1,
      top: 524,
      left: 385, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'T7',
      building: 't',
      floor: 1,
      top: 540,
      left: 270, // pixels
      roomType: 'lecture-hall'
    },
    {
      name: 'CS Library',
      building: 't',
      floor: 1,
      top: 315,
      left: 480, // pixels
      roomType: 'library'
    },
    {
      name: 'TiK Guild Room',
      building: 't',
      floor: 1,
      top: 115,
      left: 1225, // pixels
      roomType: 'student-room'
    },
    {
      name: 'OLOhuone',
      building: 't',
      floor: 1,
      top: 460,
      left: 880, // pixels
      roomType: 'student-room'
    },
    {
      name: 'Sodexo Tietotekniikka',
      building: 't',
      floor: 1,
      top: 290,
      left: 840, // pixels
      roomType: 'cafeteria'
    },
    {
      name: 'Toilets 1st Floor',
      building: 't',
      floor: 1,
      top: 195,
      left: 880, // pixels
      roomType: 'toilet'
    },
    {
      name: 'Toilets 2nd Floor',
      building: 't',
      floor: 2,
      top: 195,
      left: 880, // pixels
      roomType: 'toilet'
    },
    {
      name: 'Toilets 3rd Floor',
      building: 't',
      floor: 3,
      top: 340,
      left: 2257, // pixels
      roomType: 'toilet'
    },

    // TUAS
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