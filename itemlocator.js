var app = angular.module("itemAdmin", [ "ngRoute","ngResource", "hrCore", "hrHal"]);

app.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl : "item-list.htm",
		controller : 'itemListController',
		resolve : {
			root : function(hrRoot){
				return hrRoot("http://localhost:8090").follow().$promise;
			}
		}
	}).when('/create-item',{
		templateUrl : "create-item.htm",
		controller : 'itemController',
		resolve : {
			root : function(hrRoot){
				return hrRoot("http://localhost:8090").follow().$promise;
			}
		}
	}).when('/modify-item',{
		templateUrl : "modify-item.htm",
		controller : 'itemEditController',
		resolve : {
			root : function(hrRoot){
				return hrRoot("http://localhost:8090").follow().$promise;
			}
		}
	}).otherwise({
    redirectTo: '/'
  });

});


app.controller("MainController", ['$scope', function($scope){
  $scope.item = {};
}]);


app.controller("itemListController", ['$scope','$location','root',function($scope, $location, root){
  $scope.type = root.$link('items');

  var updateResource = function(r){
    $scope.resource = r;
    $scope.items = r.$followAll('items');
  };

  $scope.$watch('type', function(type){
    updateResource(type.follow());
  });

  $scope.openAddForm = function() {
    $location.path("/create-item");
	}

  $scope.openEditForm = function(item) {

		$scope.item.name = item.name;
		$scope.item.code = item.code;
    $scope.item.link = item.$link('self').resolvedUrl();

		$location.path("/modify-item");
	}

  $scope.deleteItem = function(r) {

		r.$delete();
    $location.path("/hello");
	}

}]);

app.controller("itemController", ['$scope', '$http', '$location','root', function($scope, $http, $location, root) {
  $scope.type = root.$link('items');

  $scope.createItem = function(item) {

		var dataObject = {
			name : item.name,
			code : item.code
		};

		var url = $scope.type.resolvedUrl();
		$http.post(url, dataObject);

		$location.path("/");
	};

}]);

app.controller("itemEditController", ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.updateItem = function(item) {

		var dataObject = {
			name : item.name,
			code : item.code
		};

		var url = item.link;
		$http.put(url, dataObject);

		$location.path("/");
	};

}]);
