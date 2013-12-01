app.controller("todosCtrl", function($scope, $location, appService){
	$scope.items = appService.getTodos();
	// $scope.items = [];
	$scope.newItem = null;

	$scope.$watch('items', function(newVal, oldVal){
		appService.putTodos(newVal);
	})

	$scope.addItem = function(){
		$scope.items.push($scope.newItem);
		$scope.newItem = null;
	}

	$scope.delItem = function(i){
		$scope.items.splice(i, 1);
	}

	$scope.gotoNotes = function(){
		$location.path('/notes');
	}
})