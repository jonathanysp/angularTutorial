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