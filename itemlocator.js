var app = angular.module("itemAdmin", [ "ngRoute","ngResource", "hrCore", "hrHal", "hrSiren", "hrLinkHeader","hrJson"]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

  });

app.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl : "item-list.htm",
		controller : 'itemController1',
		resolve : {
			root : function(hrRoot){
				return hrRoot("http://localhost:8090").follow().$promise;
			}
		}
	});

});

app.controller("itemController1", function($scope, $http, root) {

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
