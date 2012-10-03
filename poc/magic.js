var floormap = {
  /*
  * destination = {id: 'auditorium', top: 100px, left: 200px}
  */
  display: function(destination) {
    $('#destination').css({
      top: destination.top,
      left: destination.left,
      display: 'block',
      position: 'absolute'
    });
    
    var mapWrapper = $('#map-wrapper');
    var scrollTop = Math.max(0, parseInt(destination.top, 10) - mapWrapper.height()/2);
    var scrollLeft = Math.max(0, parseInt(destination.left, 10) - mapWrapper.width()/2);
    mapWrapper.scrollTo({top: scrollTop, left: scrollLeft}, {duration: 500});
    
    var hash =  "#" + destination.id;
    var mapURL = document.location.protocol + '//' + document.location.host + document.location.pathname + hash;
    this.setHash(destination.id);
    $('#qrcode').empty().qrcode(mapURL);
    $('#map-url').text(mapURL);
  },
  setHash: function(id) {
    document.location.hash = '#!/'+id;
  },
  getIdFromHash: function() {
    return document.location.hash.substring(3);
  }
}

$(function() {
  $('#auditorium').click(function() {
    floormap.display({id: 'auditorium', top: '420px', left: '610px'});
  });

  $('#rafla').click(function() {
    floormap.display({id: 'rafla', top: '630px', left: '680px'});
  });
  
  var hash = document.location.hash;
  if (hash !== "") {
    $('#' + floormap.getIdFromHash()).click();
  }
});