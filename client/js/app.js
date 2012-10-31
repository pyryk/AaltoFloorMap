var App = Spine.Controller.sub({
  init: function() {
    Spine.Route.setup();
    
    this.routes({
      "/:building/:room/": function(params) {
        console.log(params);
      },
      "/": function() {
        console.log("root");
      }
    });
    
    this.initGMaps();
  },
  initGMaps: function() {
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
});

$(function() {
  window.app = new App();
});

//$(window.app.init());