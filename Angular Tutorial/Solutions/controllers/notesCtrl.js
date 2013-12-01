app.controller("notesCtrl", function($scope, $location, appService){
	$scope.note = appService.getNote();
	// $scope.note = null;
	$scope.gotoTodo = function(){
		$location.path('/todo');
	}

	$scope.$watch('note', function(newVal, oldVal){
		appService.putNote(newVal);
	})
})