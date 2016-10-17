var app = angular.module("itemAdmin", [ "ngRoute", "ngResource", "hateoas","itemAdmin.controllers", "itemAdmin.services"]);

app.config(function($routeProvider) {

	$routeProvider.when("/", {
		templateUrl : "item-list.htm"
	}).when("/create-item", {
		templateUrl : "create-item.htm"
	});

});
