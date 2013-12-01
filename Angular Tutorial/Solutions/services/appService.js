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