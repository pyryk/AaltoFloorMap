var App = Spine.Controller.sub({
  pages: [],
  mapInitialized: false,
  
  init: function() {
    this.routes({
      "/:building": function(params) {
        console.log("Building", params);
        this.showView(params);
      },
      "/:building/:floor": function(params) {
        console.log("Floor", params);
        this.showView(params);
      },
      "/:building/:floor/:room": function(params) {
        console.log("Room", params);
        this.showView(params);
      },
      "/": function() {
        console.log("root");
        this.showView({});
      },
      "*anything": function() {
        console.log("catchall");
      }
    });
    
    Spine.Route.setup();
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
    this.mapInitialized = true;
    console.log('map initialized');
    
  },
  showView: function(params) {
    var pageName;
    var showParam;
    if (params.building) {
      pageName = 'buildingDetails';
      if (params && params.floor)
        showParam = parseInt(params.floor);
      if (!this.pages[pageName]) {
        this.pages[pageName] = new BuildingDetailsController({
          parent: $('#main'),
          item: Building.find(params.building)
        }); 
      } else {
        this.pages[pageName].item = Building.find(params.building);
      }
      
    } else {
      if (!this.mapInitialized) {
        this.initGMaps();
      } else {
        $('#main > div').not('#map-wrapper').hide();
        this.map.show();
      }
    }
    
    if (pageName) {
      // hide all...
      $('#main > div').hide();
      // ...but this
      this.pages[pageName].show(showParam);
    }
    
  },
  navigateTo: function(object, params) {
    if (object.type === 'building') {
      if (params && params.floor) {
        this.navigate('/' + object.id + '/' + params.floor + '/');
      } else {
        this.navigate('/' + object.id + '/');
      }
    } else if (object.type === 'room') {
      this.navigate('/' + object.building.id + '/' + object.floor + '/' + object.name);
    } else if (object.type === 'campus') {
      console.log('not supported yet');
    } else if (object.type === 'map') {
      this.navigate('/');
    } else {
      throw new Error('Cannot navigate to this object!');
    }
  }
});

$(function() {
  window.app = new App();
});