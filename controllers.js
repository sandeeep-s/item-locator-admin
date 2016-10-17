angular.module("itemAdmin.controllers", [])

.controller("itemController1", function($scope, $http, $location, root) {

  $scope.root = root;
  $scope.type = root.$links('items')[0];
  $scope.resource = null;

  var updateResource = function(r){
    $scope.resource = r;
    $scope.items = r.$followAll('items');
  };

  $scope.$watch('type', function(type){
    updateResource(type.follow());
  });

	$scope.saveItem = function(cmd, url) {

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
