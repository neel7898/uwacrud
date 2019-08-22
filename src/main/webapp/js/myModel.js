//This JS file defines Models for application.
//Here, we have created only one model named as Book by extending Model class provided by UWA
//here we have injected required dependency in array
define('MyApp/Models',['UWA/Class/Model', 'UWA/Class/Debug'],function(Model,Debug){
	
	//Variable to wrap up all models in single object.
	//This will help in returning all objects at once
	var MyModels = {};
	
	//Creating Book Model
	MyModels.Book = Model.extend(Debug,{
		urlRoot : 'rest/books/book', //Root URL for communication with backend
		
		//Default values
		defaults: {
            id: 0,
            bookName: '',
            category: '',
            price: 0.0
        },
        
        //Custom method to send post request to backend
        createBook : function(book,callback){
        	//Using UWA Data Request method
        	UWA.Data.request(urlRoot, {
        	    method: 'POST', //HTTP method type
        	    type: 'json', //Expects a JSON response
        	    type: 'ajax',
        	    cache: 3600,
        	    //After successful completing request this will be executed
        	    onComplete:  function (data,res) {
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
	
	//returning Model object so that it can be used again
	return MyModels;
});
