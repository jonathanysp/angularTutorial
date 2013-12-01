app.controller("notesCtrl", function($scope, $location, appService){
	$scope.note = null;
	$scope.gotoTodo = function(){
		$location.path('/todo');
	}
})