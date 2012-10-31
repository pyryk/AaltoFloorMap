window.app = {
  init: function() {
    var apikey = "AIzaSyBWZX8GGfX_4eL1f_EMjP4cr_t-1tj1uRo";

    $(function() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://maps.googleapis.com/maps/api/js?key=" + apikey
          + "&sensor=true&callback=app.initializeMap";
      document.body.appendChild(script);
    });
  },
  initializeMap: function() {
    this.map = new MapController();
  }
};

$(window.app.init());