/*****************************
app implemets the basic structure for holding all the views
and routers, so as to keep them out of global scope and prevent
multiple instances of same class 
****************************/
var app = {

    loader : null,          //holds the loader View
    curent_view : null,     //holds the current PhotoView 
    router : null,          //holds the instance of application router
    url : '',               //holds the url for querying the flickr api

    
    //init is called only once when the router hits the root url, this removes any prevoius events and binds them again, prevents duplication of binding
    init : function(){ 
        $(document).unbind('recieved_flickr_data');
        $(document).bind('recieved_flickr_data',app.recievedData);
    },

    //this function generates the loading view and makes call to the flickr api
    initialize : function(){

        if(app.curent_view != null){
            app.curent_view.remove();
        }

        app.loader = new LoadingView();

        $.getJSON(this.url,function(data){});

    },

    setView : function(view){
        app.curent_view = view;
    },

    //this is called whenever response from flickr is recieved, removed loading view and adds photoview.
    recievedData : function(e,data){
        console.log('recieved data');

        var photos = data.items;
        var photo_collection = new FlickrPhotoCollection();

        if( photos != null && photos.length > 0 ){

            var len = photos.length;
            for(var i=0; i<len; i++){

                var photo_item = new FlickrModel();

                photo_item.set({
                    'link' : photos[i].link,
                    'media' : photos[i].media.m,
                    'author' : photos[i].author,
                    'author_id' : photos[i].author_id,
                    'tags' : photos[i].tags 
                });

                photo_collection.add(photo_item);

            }
        }

        app.loader.remove();
        app.curent_view.setCollection(photo_collection);
        app.curent_view.render();

    }
}


//since the api of flickr sends a JSONP response which cannot be handled by a custom 
//callback method, jsonFlickrFeed is the implmentation for handling the JSONP response
//it triggers an event, which transmits the data recieved to document and is catched at application
function jsonFlickrFeed(data){
    $(document).trigger('recieved_flickr_data',[data]);
}