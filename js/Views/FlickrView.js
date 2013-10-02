/************************************
Master class PhotoView which handles all the views
generations for photos, this class can be extended 
to generate child views for different genres

It implements the render function to add photos to 
the view and holds the collection
************************************/
var PhotoView = Backbone.View.extend({

	initialize : function(){

		_.bindAll(this, 'render','addPhoto'); 
		$('body').append('<div id="photos-wrapper"></div>');
    	this.el = $("#photos-wrapper");
    	this._ensureElement();

	},

    render : function(){

    	var self = this;
        $(".header").show();
		_(this.collection.models).each(function(item){ 
			self.addPhoto(item);
		}, this);

    },

    events : {
    	'click a' : 'anchorClicked' 
    },

    anchorClicked : function(e){
    	e.preventDefault();
    },

    addPhoto : function(photo){

    	var template = _.template( $("#photo_template").html() );
    	$(this.el).append( template( {'photo' : photo.attributes } ) );

    }

});

//this class implements the view for the random feed from flickr, extends PhotoView and updates its collection in order to render view.
var FlickrPhotoView  = PhotoView.extend({

	initialize : function(){
    	
    	_.bindAll(this, 'setCollection');
    	PhotoView.prototype.initialize.apply(this);
        $(".header").html("Flickr Photo Feed");

    },

    setCollection : function(collection){
    	this.collection = collection;
    },

    events : {
      'click a.photo-container' : 'photoClicked',
    },
    
    photoClicked : function(e){
    	e.preventDefault();
    	console.log('photo clicked');
    	var id = $(e.currentTarget).data('author');
    	console.log(id);
    	app.flickr_router.navigate('authors/'+id, { trigger : true });
    },

});

// similar to FlickrPhotoView, just implements users feed
var AuthorPhotoView = PhotoView.extend({

	initialize : function(){

		_.bindAll(this, 'setCollection'); 
		PhotoView.prototype.initialize.apply(this);
        $(".header").html("Authors Photo Feed");

	},

	setCollection : function(collection){
    	this.collection = collection;
    },

    events : {
      'click a.photo-container' : 'showFriendsPhotos',
    },

    showFriendsPhotos : function(e){
    	e.preventDefault();
    	console.log('photo clicked');
    	var id = $(e.currentTarget).data('author');
    	console.log("friends photos",id);
    	app.flickr_router.navigate('friends/'+id, { trigger : true });
    }


});

//similar to FlickrPhotoView, implements users friends feed
var FriendsPhotoView = PhotoView.extend({

	initialize : function(collection){

		_.bindAll(this, 'setCollection'); 
		PhotoView.prototype.initialize.apply(this);
        $(".header").html("Friends Photo Feed");

	},

	setCollection : function(collection){
    	this.collection = collection;
    },

});


var LoadingView = Backbone.View.extend({

	el: $("#loading-wrapper"),

	initialize : function(){

		$('body').append('<div id="loading-wrapper"></div>');
		this.el = $("#loading-wrapper");
		$(this.el).append('<div class="loader"><div class="ball"></div></div>');
        $(".header").hide();

	},

	remove : function(){
		$('#loading-wrapper').remove();
	}


});