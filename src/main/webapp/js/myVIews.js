//This JS file defines Views for application.
//Here, we have created three views named as BookRowView,BookFormView,BookTable by extending View class provided by UWA
//here we have injected required dependency in array
define('MyApp/Views',['MyApp/Collections','MyApp/Models','UWA/Class/View'],function(MyCol,MyMod,View){
	
	//Variable to wrap up all models in single object.
	//This will help in returning all objects at once
	var MyViews = {};
	
	//Creating BookRowView. It represents single row in table.
	MyViews.BookRowView = View.extend(UWA.Class.Debug, {
		
		tagName : 'tr',		//root tag of this view, it means view generated using this view will be inside <tr></tr>
		
		//setup is the first function which is fired when view object is initialized.
		setup : function(){
			
			//creating 4 custom variables. This will help when we will click update button
			//and text will be converted into input fields
			//refer open function below to see how the conversion is happening
			var bookNameColumn =  {
		        	 tag: 'td',								//element tag <td></td>
			         'class': 'uk-preserve-width',       	//<td class="uk-preserve-width"></td> here uk-preserve-width is css class of UIKIT.
			         id : 'bookName'+this.model.get('id'),	//<td class="uk-preserve-width" id="bookNamemb1"></td>
			         text: this.model.get('bookName')		//<td class="uk-preserve-width" id="bookNamemb1">My Book Name</td>
		    }
			
			var categoryColumn = {
		        	 tag: 'td',
			         'class': 'uk-preserve-width',
			         id : 'category'+this.model.get('id'),
			         text: this.model.get('category')
		    }
			
			var priceColumn =  {
	        	 tag: 'td',
		         'class': 'uk-preserve-width uk-text-center',
		         id : 'price'+this.model.get('id'),
		         text: this.model.get('price')
	        }
			
			var updateBtnColumn = {			
	        	 tag: 'td',													//element tag <td></td>
	        	 'class' : 'uk-text-center',								//<td class="uk-text-center"></td>
		         html : {					
		        	 tag : 'button',										//<td class="uk-text-center"><button></button></td>
		        	 text : 'Update',										//<td class="uk-text-center"><button>Update</button></td>
			         'class': 'uk-button uk-button-primary update-btn',		//<td class="uk-text-center"><button class="uk...">Update</button></td>
		         }
	        }
			
			//calling render method with above variable to render single row. <tr> Content inside this will be rendered here  </tr>
			this.render(bookNameColumn,categoryColumn,priceColumn,updateBtnColumn);
		},
		
		//rendering function
		render: function (bookNameColumn,categoryColumn,priceColumn,updateBtnColumn) {
			
			//this.container means our root tag i.e. <tr></tr>
			//set content will replace whatever input we will give here in view
		    this.container.setContent([
		        {
		            tag: 'td',
		            'class': 'uk-text-center',
		            text: this.model.get('id')
		        },
		        bookNameColumn,		//custom variable which we have given asa input. This are simple javascript objects only
		        categoryColumn,
		        priceColumn,
		        updateBtnColumn,
		        {
		        	 tag: 'td',
		        	 'class' : 'uk-text-center',
			         html : {
			        	 tag : 'button',
			        	 text : 'Delete',
			        	 'class': 'uk-button uk-button-danger delete-btn',	//notice class delete-btn it will be used to register event below
			         }
		        }
		    ]);
		    
		    
		    return this;
		  },
		
		//registering dom events such as click 
		domEvents: {
		    "click .update-btn":  "open",  //this implies that on clicking any element with class update-btn, "open" method should run 
		    "click .save-btn" : "save",		//example :  <button class="update-btn">Some Button</button>
		    "click .delete-btn" : "destroy",		//Here we are registering event with class delete-btn
		    "click .cancel-btn" : "setup"
		},
		
		//this is a custom function which will replace our table values with input fields.It will be called when we will click update button
		open: function (domClickEvent) {
			
			//We are redefining our variables with input fields and than render again.
			var bookNameColumn =  {
		        	 tag: 'td',										//<td></td>
			         'class': 'uk-preserve-width',					//<td class="uk-preserve-width"></td>
			         html : {					
			        	 tag : 'input',								//<td class="uk-preserve-width"><input><input></td>
			        	 value :  this.model.get('bookName'),		//<td class="uk-preserve-width"><input value="My Book Name"></input></td>
				         id : 'bookNameinput'+this.model.get('id'),//<td class="uk-preserve-width"><input value="My Book Name" id="book.."></input></td>
			        	 type : 'text',			//<td class="uk-preserve-width"><input value="My Book Name" id="book.." type="text"></input></td>
			        	 'class' : 'uk-input uk-form-controls'
			         }				//<td class="uk-preserve-width"><input value="My Book Name" class="uk-input.." id="book.." type="text"></input></td>
		    }
			
			var categoryColumn = {
		        	 tag: 'td',
			         'class': 'uk-preserve-width',
			         html : {
			        	 tag : 'input',
			        	 value :  this.model.get('category'),
				         id : 'categoryinput'+this.model.get('id'),
			        	 type : 'text',
			        	 'class' : 'uk-input uk-form-controls'
			         }
		    }
			
			var priceColumn =  {
	        	 tag: 'td',
		         'class': 'uk-preserve-width',
		         html : {
		        	 tag : 'input',
		        	 value :  this.model.get('price'),
			         id : 'priceinput'+this.model.get('id'),
		        	 type : 'text',
		        	 'class' : 'uk-input uk-form-controls'
		         }
	        }
			
			var updateBtnColumn = {
	        	 tag: 'td',
	        	 'class' : 'uk-text-center',
		         html : [{
		        	 tag : 'button',
		        	 'uk-icon':"check",
			         'class': 'uk-button uk-button-success save-btn',
		        	 
		         },{
		        	 tag : 'button',
		        	 'uk-icon':"close",
			         'class': 'uk-button uk-button-danger cancel-btn',
		        	 
		         }]
	        }
			
			//rerender this view using input fields
			this.render(bookNameColumn,categoryColumn,priceColumn,updateBtnColumn);
		  },
		
		//This is function to save the updated object after updating the values and clicking ok button
		save : function(){
			
			//inbuilt method provided by UWA class it will send PUT request to backend
			//since we provided the rootUrl as 'rest/books/book
			//hence it will send request as follows
			//PUT rest/books/book/{id} and payload will be the object passed as argument
			this.model.save({
				bookName : document.getElementById('bookNameinput'+this.model.get('id')).value,
				category : document.getElementById('categoryinput'+this.model.get('id')).value,
				price : document.getElementById('priceinput'+this.model.get('id')).value
			},{
				onComplete : function(data){
					//we can see response here
					//console.log(data);
				}
			});
			//re-render this model replacing input fields with normal text as update has been completed
			this.setup();
		},
		
		
		
	    ////This will be executed when delete button is called. domevents maps button to this method
			  destroy: function () {
				 //Confirming user to delete book
			     var conf = confirm('Are you sure you want to delete the books - '+this.model.get('bookName'));
			     if(conf){
			    	 //If user clicks ok than we will call inbuilt destroy method.
			    	 //since we provided the rootUrl as 'rest/books/book
					 //hence it will send request as follows
					 //DELETE rest/books/book/{id}
			    	 this.model.destroy({});
			     }
			  }
			 
		
	});
	
	//Creating BookFormView. This is the form below table to add book object
	MyViews.BookFormView =  View.extend({
		tagName : 'tr',		//root tag of this view, it means view generated using this view will be inside <tr></tr>
		className : 'uk-background-muted',		//<tr class="uk-background-muted"></tr>
		
		//setup is the first function which is fired when view object is initialized.
		setup : function(){
			this.render();
		},
		
		//render form
		render : function(){
			this.container.setContent([
				{
					tag : 'td',
					text : ''
				},
				{
					tag : 'td',
					'class': 'uk-preserve-width',
			         html : {
			        	 tag : 'input',
			        	 id : 'newBookNameInput',
			        	 placeholder : 'Book Name..',
			        	 type : 'text',
			        	 'class' : 'uk-input uk-form-controls'
			         }
				},
				{
					tag : 'td',
					'class': 'uk-preserve-width',
			         html : {
			        	 tag : 'select',
			        	 id : 'newCategoryInput',
			        	 'class' : 'uk-select uk-form-controls',
			        	 html : [{
			        		 tag : 'option',
			        		 text : 'Select',
			        		 value : ''
			        	 },{
			        		 tag : 'option',
			        		 text : 'Business',
			        		 value : 'Business'
			        	 },
			        	 {
			        		 tag : 'option',
			        		 text : 'Computers',
			        		 value : 'Computers'
			        	 },
			        	 {
			        		 tag : 'option',
			        		 text : 'Programming',
			        		 value : 'Programming'
			        	 },
			        	 {
			        		 tag : 'option',
			        		 text : 'Science',
			        		 value : 'Science'
			        	 }]
			         }
				},
				{
					tag : 'td',
					'class': 'uk-preserve-width',
			         html : {
			        	 tag : 'input',
			        	 id : 'newPriceInput',
			        	 placeholder : 'Price..',
			        	 type : 'text',
			        	 'class' : 'uk-input uk-form-controls'
			         }
				},{
					tag : 'td',
					'class': 'uk-preserve-width uk-text-center',
			         html : {
			        	 tag : 'button',
			        	 text : 'Create',
				         'class': 'uk-button uk-button-success create-btn'
			         }
				},{
					tag : 'td',
					text : ''
				}
			]);
			
			return this;
		},
		
		//registering dom events such as click,change,mousein etc.
		domEvents: {
		    "click .create-btn":  "createBook", //on clicking any element with class create-btn. call createBookMethod 
		},
		
		//This method will be executed on clicking create button
		createBook : function(){
			
			var name = document.getElementById('newBookNameInput').value;
			var cat = document.getElementById('newCategoryInput').value;
			var prc = document.getElementById('newPriceInput').value;
			
			if(name == ''){
				alert('All fields are mandatory');
				return;
			}
			if(cat == ''){
				alert('All fields are mandatory');
				return;
			}
			if(prc == ''){
				alert('All fields are mandatory');
				return;
			}
			
			//here model will be the collection object that we created. model is decided when view object is created.
			//refer bookApp to see initialization
			//this method is explained in myCollection.js
			//it will send POST rest/books/book along with the book object provided as argument below
			this.model.createBook({bookName : name, category : cat, price : prc},function(){
				alert('Book Added Successfully');
			});
		}
		
	});
	
	//Creating BookTableView. This is the table which will be shown to the user. It takes collection as model.
	MyViews.BookTableView =  View.extend({
		tagName : 'table',										//root element <table></table>
		className: 'uk-table uk-table-divider uk-table-hover',
		
		//setup is the first function which is fired when view object is initialized.
		setup : function(){
			this.render();
		},
		
		render: function () {
			
			var cont = this.container;	//creating reference to container so that we can use it in loops. <table></table>
			
			var columnNames = ['ID','Book Name','Category','Price','Update','Delete']; //columns
			
			var thead = UWA.createElement('thead',{			//<thead></thead>
				'class' : 'uk-background-muted'
			});
			var tbody = UWA.createElement('tbody');			//<tbody></tbody>
			
			columnNames.forEach(function(val){				//for all columns adding it in thead
				thead.addContent({													
					tag : 'th',															//<thead>
					'class' : 'uk-table-shrink uk-text-center uk-text-emphasis',		//	<th class="uk-table ..."><b>ID</b></th>
					html : {															//	<th class="uk-table ..."><b>Name</b></th>
						tag : 'b',														//  
						text : val														//</thead>
					}
				});
			});
				
			this.model.forEach(function (mod, idx) {
				var bookRowView = new MyViews.BookRowView({							//We are adding rowview which we created in tbody
					model : mod														//we are using for loop to iterate in collection
				});																	//and creating row view from it
				tbody.addContent(bookRowView.container);							//after creating row view we are adding it to tbody tag
			});
			
			//if condition to check if there is no object in current collection
			//if there is no object than show a message No Book Added to the user
			if(this.model.length == 0){
				tbody.addContent({
					tag : 'td',
					colspan : '6',
					text : 'No Books Added!',
					styles : {
						'text-align' : 'center',
						'background' : 'aliceblue'
					}
				});
			}

			//Creating a form view and adding at the end of tbody tag
			var bookForm = new MyViews.BookFormView({
				model : this.model
			});
			tbody.addContent(bookForm);
			
			//setting thead and tbody inside container i.e. <table></table>
			cont.setContent(thead,tbody);
		    return this;
		  },
    
	});
	
	
	
	return MyViews;
});