//This JS file defines our application.
//Here, we have created required collection and render it and set it to widget body
//here we have injected required dependency in array
define('MyApp',['MyApp/Collections','MyApp/Views','UWA/Widget'],function(MyCollections,MyViews,Widget){	

	var Books = MyCollections.Books;		//defining our collection
	var BookRowView = MyViews.BookRowView;	//defining our views
	var BookTableView = MyViews.BookTableView;
	
	var widget = new Widget();
	
	//creating a new collection
	var books = new Books();
	
	//method to render view
	var renderVIew = function(){
		
		//using fetch method
		//it sends a get request to the url which we have set in our books collection i.e. 'rest/books'
		//GET rest/books
		books.fetch({
			onComplete : function(){						//after successful request. create table view and add it to widget body
				
				//event to re-render our view after any new book object is added
				books.addEvent('onAdd',function(data){		
					renderVIew();
				});
				
				//event to re-render our view after any a book object is deleted
				books.addEvent('onRemove',function(data){
					renderVIew();
				});
				
				//creating table view. notice we have initialized this view using our collection
				var bookTableView = new BookTableView({
					model : books		//books is the collection which we have created above
				});	
				
				//setting widget body.
				widget.setBody([{
						tag : 'div',
						'class' : 'uk-overflow-auto',
						html : [bookTableView]
				}]);
	}
	});
	}	
	
	//calling render view for first time as soon as this file is loaded to render view
	renderVIew();

});