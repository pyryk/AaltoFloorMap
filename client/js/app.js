var App = Spine.Controller.sub({
  pages: [],
  mapInitialized: false,
  currentPage: undefined,

  init: function() {
    this.routes({
      "!/:building": function(params) {
        this.showView(params);
      },
      "!/:building/:floor": function(params) {
        this.showView(params);
      },
      "!/:building/:floor/:room": function(params) {
        this.showView(params);
      },
      "!/": function() {
        this.showView({});
      },
      "*anything": function() {
        this.navigateTo({type: 'map'});
      }
    });

    // bind hashchange events to spine events for sidebar
    $(window).bind('hashchange', function() {
      Spine.trigger('hashchange', window.location.hash, document.URL);
    });
    
    // init sidebar & searchbar
    new SidebarController({
      el: $('#sidebar'),
      item: Sidebar.create()
    }).render();

    new SearchbarController({
      el: $('#search')
    }).render();

    new BackButtonController({
      el: $('#back')
    }).render();
    
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
    
  },
  showView: function(params) {
    var pageName;
    var showParam;
    if (params.building) {
      pageName = 'buildingDetails';
      var building = Building.find(params.building);
      if (params && params.floor)
        showParam = parseInt(params.floor);

      if (params && params.room) {
        var room = Room.find(building,params.room);
        room.toggleActive();
      } else {
        Room.deactivateAll();
      }

      if (!this.pages[pageName]) {
        this.pages[pageName] = new BuildingDetailsController({
          parent: $('#main'),
          item: building,
        }); 
      } else {
        this.pages[pageName].setBuilding(Building.find(params.building));
      }
      
    } else {
      // showing the campus map instead
      this.currentPage = this.map;
      if (!this.mapInitialized) {
        this.initGMaps();
      } else {
        $('#main > div').not('#map-wrapper').hide();
        this.map.show();
      }
      Spine.trigger('page:changed', this.map, this, this.getPreviousPage());
    }
    
    if (pageName) {

      if (this.currentPage !== this.pages[pageName]) {
        // change the view

        // hide all...
        $('#main > div').hide();
        // ...but this
        this.currentPage = this.pages[pageName];
        Spine.trigger('page:changed', this.pages[pageName], this, this.getPreviousPage());
      }

      // (re)draw the current view
      this.pages[pageName].show(showParam);
    }
    
  },
  getPreviousPage: function() {
    if (this.currentPage && this.currentPage === this.pages['buildingDetails']) {
      return {type: 'map', name: 'Map'};
    }

    return undefined;
  },
  navigateTo: function(object, params) {
    if (object.type === 'building') {
      if (!params) {
        params = {};
      }
      // default to the "first" floor
      if (!params.floor && object.floors.length > 0) {
        params.floor = object.floors[0].number;
      }
      this.navigate('!/' + object.id + '/' + params.floor + '/');
    } else if (object.type === 'room') {
      this.navigate('!/' + object.building + '/' + object.floor + '/' + object.name);
    } else if (object.type === 'campus') {
      console.log('not supported yet');
    } else if (object.type === 'map') {
      this.navigate('!/');
    } else {
      throw new Error('Cannot navigate to this object!');
    }
  }
});

$(function() {
  window.app = new App();
});