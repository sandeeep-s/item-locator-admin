var app = angular.module("itemAdmin", [ "ngRoute" ]);

app.config(function($routeProvider) {

	$routeProvider.when("/", {
		templateUrl : "item-list.htm"
	}).when("/create-item", {
		templateUrl : "create-item.htm"
	});

});

app.controller("itemController", function($scope, $http, $location) {

	$http.get('http://localhost:8090/items').then(function(response) {
		$scope.items = response.data._embedded.items;
	})

	$scope.saveItem = function() {

		$http({
			method : "POST",
			url : "http://localhost:8090/items",
			data : {
				name : $scope.iName,
				code : $scope.iCode
			}
		});
		
		$location.path("/");
	};
	
	$scope.deleteItem = function(url){
		
		alert(url);
		
		$http({
			method : "DELETE",
			url : url
		});
		
	}
	
	$scope.go = function ( path ) {
		  $location.path( path );
	};

});
