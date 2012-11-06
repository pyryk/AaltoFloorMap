(function(){
  var roomdata = [
    {
      name: 'Paniikki',
      building: 't',
      floor: 1,
      top: 200,
      left: 800 // pixels
    },
    {
      name: 'T1',
      building: 't',
      floor: 2,
      top: 200,
      left: 800 // pixels
    },
    {
      name: 'OLOhuone',
      building: 't',
      floor: 1,
      top: 400,
      left: 500 // pixels
    }
  ];
  
  for(var i in roomdata) {
    Room.create(roomdata[i]);
  }
})();