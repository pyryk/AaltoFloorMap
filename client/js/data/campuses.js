(function(){
  var campusdata = [
    {name: 'Otaniemi', location: [60.185433, 24.826012], zoomlevel: 15, default: true},
  ];
  
  for(var i in campusdata) {
    Campus.create(campusdata[i]);
  }
})();