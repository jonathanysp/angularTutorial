# A quick tutorial on AngularJS
**By Jonathan Poon (jypoon)**


In this tutorial you will be learning about 5 foundational components of the AngularJS framework: controllers, models, directives, views and services. You will be building a webapp that contains a todo application and a notepad that will persist even when the user closes and reopens the website.

Keep in mind that this tutorial does not have any css styling so your end product will be functional, but ugly. You may choose to use bootstrap to make things prettier.

## Getting Started
*Note*: Steps 1, 2 and 4 are not required by angular but are highly recommneded as it will create a small webserver on your computer. Opening html files from a webserver is much less error prone than simply opening index.html
1. Make sure that you have nodejs and npm installed on your computer
2. Install grunt from npm: `npm install -g grunt-cli`
3. Download the files [here](/tutorial.zip) or clone this git directory: `git@github.com:jonathanysp/angularTutorial.git`
4. Open your terminal and cd into the folder you cloned and run `npm install` to install the websever, when done run `grunt http-server`
5. Open your browser and navigate to `localhost:3000`
6. If everything worked, you should see a friendly message
7. If you have opted not to run the websever, simply open the index.html file. **make sure to allow chrome to access local files by starting from like this:** `google-chrome --allow-file-access-from-files`

## Hello, World!
We will start by creating a simple hello world message using Angular. We first have to create an app and register it with angular. Open the app.js file and define a new app:

```
var app = angular.module("todo", []);
```

We have now declared a new application called `todo` within angular, next we will associate it with the DOM. In index.html, associate the body tag with the "todo" app

```
<body ng-app="todo">
```

The next step is to create a controller that handles all the data in the message. A controller, is used to manipulate data or sets of data. In this case it will hold our message. Open the helloWorldCtrl.js file and type the following lines:

```
app.controller("helloWorldCtrl", function($scope){
	$scope.msg = "hello world!";
})
```

This creates a new controller called "helloWorldCtrl". Each controller has a $scope variable which stores all of its local data. In this controller, it contains a `$scope.msg` string with `hello world`.

**Remember to include the javascript files you edited into index.html!**

Next we will associate the controller to a DOM element in index.html. We may choose to associate it to the `<body>` tag of a `<div>` inside the body. As long as it is on the same level as or in a child element of the `ng-app=todo` it will work. In this case, we will create a new `<div>` element under `<body>` and associate it with our new controller.

```
<body ng-app="todo" ng-controller="helloWorldCtrl">
	<div ng-controller="helloWorldCtrl">
	</div>
</body>
```

Everything inside the controller div can now access the `$scope` variable. To do this, we place our angular expressions inside double curly braces ``{{}}``. Angular will evaluate everything inside double curly braces as well as inside `ng-*` attributes e.g. `ng-controller="helloWorldCtrl"`.

To display our message, we can simply do this:

```
<body ng-app="todo" ng-controller="helloWorldCtrl">
	<div ng-controller="helloWorldCtrl">
		{{msg}}
	</div>
</body>
```

If you go to `localhost:3000` now, you should see our message!

If not, make sure you have included all the javscript files and check the javascript console (`ctrl+shift+j` on chrome) to check for bugs. You may install "Angular Batarang" form the chrome web store to help debug Angular code.

Now we want to be able to modify the message variable on the fly. We do this by using a **model** which binds the variable to a dom element.

We can create an text input field and bind it to `msg` by adding the following:

```
<body ng-app="todo" ng-controller="helloWorldCtrl">
	<div ng-controller="helloWorldCtrl">
		<input ng-model="msg"/>
		{{msg}}
	</div>
</body>
```

You should now have an editable text field that will modify the msg variable when you type!

Make sure that you understand controllers and models from this example. We will now start building the todo application.

## Controllers
Open the `todosCtrl.js` file in the controllers folder. Within the file, define a new controller called `todosCtrl` just like how we did helloWorldCtrl. Within this, we will initialize the following fields:
- $scope.items = [] //an array in which we will store our list
- $scope.newItem = null //a variable to hold the new item being edited

We can also define functions inside the controller scope. Define a function that will push the contents of newItem into the items array and clear whatever is stored in newItem. Also define a function that will delete (splice) an element at a given index.

```
$scope.addItem = function(){
	$scope.items.push($scope.newItem);
	$scope.newItem = null;
}

$scope.delItem = function(i){
	$scope.items.splice(i, 1);
}
```

Now lets connect this controller to a div inside the app in the DOM. If you have connected it properly, display the `$scope.item` array inside the div and you should now see an empty array "[]"

## Directives
Directives are the attributes you add to DOM elements starting with "ng" or other ones that you define manually. They help you manipulate DOM element as well as event listeners for the DOM. The separation of controllers and directives allows you to keep your data and its DOM representation separate and easy to handle.

A very useful directive is ng-repeat which will loop through an array and create an element for each item in the array. In this case, we will create an unordered list and create a list item for each element in the array using ng-repeat.
```
<ul>
	<li ng-repeat="item in items">
		{{item}}
	</li>
</ul>
```
Next, we will want to create a field to add a new item, using ng-models, this is similar to the our hello world example. But in this case, we would like to wrap the input in a form, so we can submit the newItem to be processed by the controller when we press enter.

Finally lets assign an submit listener to our form element using ng-submit="addItem" which will be called when we press enter in the input box.

```
<form ng-submit="addItem()">
	<input type="text" ng-model="newItem"/>
</form>
```

We should now have a functioning todo list!

Next we will add a delete button for each element on the list. Each element should have a slightly different delete function as it should only delete itself. Angular can do all of this for you using `ng-repeat` and `ng-click`!
```
<li ng-repeat="item in items">
	<button ng-click="delItem($index)">x</button>
	{{item}}
</li>
```
The ng-repeat directive exposes a $index variable (along with other useful things) which will give you the index of the item it is looping over. This works perfectly to associate a different click handler for our delete buttons (`delItem(0)`, `delItem(1)`...).

Our todo list should now be fully functional!

## Views
What if we wanted to expand our app to have multiple controllers? There is already a notesCtrl created inside the controller folder which supports saving a string into `$scope.note`. To use this, we can create another `.html` file which has DOM elements modeling `$scope.note` but this will not be ideal as the browser will have to reload a whole new webpage.

This causes the browser to possibly delete all the scripts, controllers and resources related to the previous page so when the user goes back, it will have to download and reprocess that again.

A better way would be to use views and rather than loading a new page, only download the new information required, hide the old stuff and only show the new stuff. Because we do not switch to a new page, both the old and new stuff will all be cached by the browser. Also, we can do transitions more easily.

We do this by using routing and views, we define a route in router.js which connects a url to a **partial** which is the html related to that page as well as the controller in charge of that partial. We connect the routes in a scheme like this:

```
mywebsite.com/#todo --> templates/todo.html : todosCtrl
mywebsite.com/#notes --> templates/notes.html : notesCtrl
mywebsite.com/#[everything else] --> /todo
```

Notice the "#" after the "/" which shows that instead of loading a subdirectory from the server, we tell angular to get us the new view.

In the router.js file, we will configure a `$routeProvider` which will redirect the paths for us.

```javascript
app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/todo', {
			templateUrl: 'templates/todo.html',
			controller: 'todosCtrl'
		}).
		when('/notes', {
			templateUrl: 'templates/notes.html',
			controller: 'notesCtrl'
		}).
		otherwise({
			redirectTo: '/todo'
		})
	}])
```

Next we will have to move the div we have attached to "todosCtrl" to its own file in templates/todo.html, we can copy everything inside the div where we declared ng-controller="todosCtrl" into this partial. Next we will write the DOM elements for the notesCtrl in its own templates file at "templates/notes.html". Note that we do not need to dclare `ng-controller` in the partial as this is already delcared in the router

Finally, in our `index.html` we will create a div inside our ng-app with the directive `ng-view`. This tells angular where to insert the partials.

Now, we need to create a link between the two views. We can either us an `<a>` tag or we can do it programatically. To control the location of the browser, we use the $location service, we simply add that to the function in the controller. like this:

```
app.controller("todosCtrl", function($scope, $location){
	...
}
```

Dont worry about the order in which the parameters are given, angular reads in the name of the parameter first before passing them in, this is called depenency injection.

Now we can add the function that takes the user to notes like this:

```
$scope.gotoNotes = function(){
	$location.path('/notes');
}
```

Next, we can attach this function to a button using the `ng-click` directive.

```
<button ng-click="gotoNotes()">Notes</button>
```

Do the same for notes, to take the user back.

You should now have a functional todo list page and a notes page!

## Services
You may have noticed that todo itmes and notes do not persist when you change views. This is because each time the view is rendered, a new controller is created and the old one is discarded when we change views. To keep the data persistant, we will need to create a service which will store the data that we need. Services, unlike controllers, are singleton objects, so there can only be one instance of them. Therefore, they are a great way to store and fetch data from. To create a new service, open appService.js in the services folder.

We create a two variables, an array to store item and a normal variable to store the note. We then return a set of functions that allow us to get and set the variables. We can make this more complex to interface with either localStorage API of web browsers or with a database hosted on a server.

```
app.factory('appService', function () {
	var todos = [];
	var note = null;

	return {
		getTodos:function () {
			return todos;
		},
		putTodos:function (newTodos) {
			todos = newTodos;
		},
		getNote: function(){
			return note;
		},
		putNote:function(newNote){
			note = newNote;
		}
	};
});
```

Now we have to modify our controllers to use this service to retrieve and store data. We simply add "appService" as an extra parameter to the controller function. It does not matter which order we arrange the parameters here because Angular dependency injection will read the source code and pass in the correct service. Therefore, in this special case, **parameter names are important!**

```
app.controller("todosCtrl", function($scope, $location, appService){
	$scope.items = appService.getTodos();
	$scope.newItem = null;

	$scope.addItem = function(){
		$scope.items.push($scope.newItem);
		$scope.newItem = null;
	}

	$scope.$watch('items', function(newVal, oldVal){
		appService.putTodos(newVal);
	})

	$scope.delItem = function(i){
		$scope.items.splice(i, 1);
	}

	$scope.gotoNotes = function(){
		$location.path('/notes');
	}
})
```

We create a $watch function on the variable #scope.items so that whenever it is modified, its changes are updated with appService.

Do the same with notesCtrl.js

Your data should now be persistant when views are changed!

## Conclusion
You should now have a fully functioning todo and notes app. Look at the mockup code for the TAG collection I wrote and you should understand the basic idea of how it works. You should be familiar with the foundations if Angular with controllers, models, directives, views and services.

The only topic used in the TAG mockup are filters but you should be able to figure that out easily.

For extra credit, you can make the appService.js interface with the HTML5 localStorage API to store the data so it will persist even if the user closes the site!

I would encourage you to read more about other built in services and directves Angular provides such as `$http` service and `ng-animation` directives.

I hope you had fun learning about Angular!
