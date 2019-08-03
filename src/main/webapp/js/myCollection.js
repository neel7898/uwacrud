//This JS file defines Collections for application.
//Here, we have created only one collection named as Books by extending Collection class provided by UWA
//here we have injected required dependency in array
define('MyApp/Collections',['UWA/Class/Collection', 'MyApp/Models'],function(Collection,MyModels){
	
	//Variable to wrap up all models in single object.
	//This will help in returning all objects at once
	var MyCollections = {};
	
	//Creating Books Collection
	MyCollections.Books = Collection.extend({
		url : 'rest/books',  //Root URL for communication with backend
		model : MyModels.Book, //Model Type for collection
		
		//Custom method to send post request to backend
		createBook : function(book,callback){
			var that = this;			//setting reference to current object
        	UWA.Data.request(that.url+'/book', {
        	    method: 'POST',   //HTTP method type
        	    type: 'json',    //Expects a JSON response
        	    type: 'ajax',
        	    cache: 3600,
        	  //After successful completing request this will be executed
        	    onComplete: function (data,res) {
        	    	//updating our collection
        	    	that.fetch();
        	    	//checking if callback is a funtion
        	    	if (typeof callback === "function") {
        	    		//executing callback function
        	    		callback(JSON.parse(data),res);
        	    	}
        	    },
        	    //If request fails execute following function
        	    onFailure: function (res) {
        	        console.log('Some error');
        	    },
        	  //custom header
        	    headers: {
        	        'Content-Type': 'application/json'
        	    },
        	  //Data to be sent to backend server
        	    data: JSON.stringify(book)
        	});
        	
        }
	});
	
	//returning Collection object so that it can be used again
	return MyCollections;
});