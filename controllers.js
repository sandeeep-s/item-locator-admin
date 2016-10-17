angular.module("itemAdmin.controllers", [])

.controller("itemController1", function($scope, $http, $location, Item) {

	$scope.item = new Item();

  $scope.items = Item.query(function(){
    console.log(items);
  });

	$scope.saveItem = function(cmd, url) {

    $scope.item = new Item();
		var dataObject = {
			name : $scope.item.name,
			code : $scope.item.code
		};

		if (cmd == "add") {

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

});
