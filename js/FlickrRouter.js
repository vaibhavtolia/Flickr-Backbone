var FlickrRouter = Backbone.Router.extend({

	routes: {
        "authors/:id" : "getAuthorPhotos",	//route for authors feed
        "friends/:id" : "getFriendsPhotos",	//route for authors friends feed
        "": "defaultRoute" // default route, all route apart from above routes will end up here
	},

	defaultRoute : function(){

		app.init();
		app.url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=fancy&callback=?';
		app.initialize();
		var view = new FlickrPhotoView();
		app.setView(view);
	},

	getAuthorPhotos : function(id){

		app.init();
		app.url = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&callback=?&id="+id;
		app.initialize();
		var view = new AuthorPhotoView();
		app.setView(view);
	},

	getFriendsPhotos : function(id){
		
		app.init();
		app.url = "http://api.flickr.com/services/feeds/photos_friends.gne?format=json&callback=?&user_id="+id;
		app.initialize();
		var view = new FriendsPhotoView();
		app.setView(view);
	}

});

app.flickr_router = new FlickrRouter();

Backbone.history.start({ 
	pushState: true,
	root: '/'
});