var app = angular.module("itemAdmin", []);
app.controller("itemController", function($scope, $http) {

	$scope.saveItem = function() {

		$http({
			method : "POST",
			url : "http://localhost:8090/items",
			data : {
				name : $scope.iName,
				code : $scope.iCode
			}
		});

	};

	$http.get('http://localhost:8090/items').then(function(response) {
		$scope.items = response.data._embedded.items;
	})
});
