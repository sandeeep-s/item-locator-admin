var app = angular.module("itemAdmin", [ "ngRoute" ]);

app.config(function($routeProvider) {

	$routeProvider.when("/", {
		templateUrl : "item-list.htm"
	}).when("/create-item", {
		templateUrl : "create-item.htm"
	});

});

app.controller("itemController", function($scope, $http, $location) {

	$scope.item = {};

	$http.get('http://localhost:8090/items').then(function(response) {
		$scope.items = response.data._embedded.items;
	})

	$scope.saveItem = function(cmd, url) {

		var dataObject = {
			name : $scope.item.name,
			code : $scope.item.code
		};

		if (cmd == "add") {
			var url = "http://localhost:8090/items";
			$http.post(url, dataObject);
		} else {
			$http.put(url, dataObject);
		}

		$location.path("/");
	};

	$scope.deleteItem = function(url) {

		$http.delete(url);

	}

	$scope.openEditForm = function(item) {

		$scope.item.name = item.name;
		$scope.item.code = item.code;
		$scope.iUrl = item._links.self.href;
		$scope.cmd = "edit";

		$location.path("/create-item");
	}

	$scope.openAddForm = function() {

		$scope.cmd = "add";
		$location.path("/create-item");
	}

	$scope.go = function(path) {
		$location.path(path);
	};

});
