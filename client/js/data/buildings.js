(function(){
  var buildingdata = [
    {name: 'TUAS', location: [60.186955, 24.819574], floors: []},
    {name: 'Tietotekniikka', location: [60.186763, 24.822192], floors: []},
  ];
  
  for(var i in buildingdata) {
    Building.create(buildingdata[i]);
  }
})();