var Sidebar = Spine.Model.sub();

Sidebar.configure('Sidebar', 'url');

Sidebar.extend({

	// sidebar's url property always reacts to hashchange events
	create: function(props) {
		var it = Spine.Model.create.apply(this, arguments);
		it.url = document.URL;
		it.save();
		Spine.bind('hashchange', it.proxy(function(hash, url) {
			this.url = url;
			this.save();
		}));
		return it;
	}
});