(function(){
  var buildingdata = [
    {
      id: 'tuas', 
      name: 'TUAS', 
      location: [60.186955, 24.819574], 
      floors: [
        {number: 1, map: 'tuas1.png'},
        {number: 2, map: 'tuas2.png'},
        {number: 3, map: 'tuas3.png'},
      ]
    },
    {
      id: 't', 
      name: 'Tietotekniikka', 
      location: [60.186763, 24.822192], 
      floors: [
        {number: 1, map: 't1.png'},
        {number: 2, map: 't2.png'},
        {number: 3, map: 't3.png'},
      ]
    },
  ];
  
  for(var i in buildingdata) {
    Building.create(buildingdata[i]);
  }
})();