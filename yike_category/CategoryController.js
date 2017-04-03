(function(angular){

  var module = angular.module('Yike.category',['ngRoute']);

  module.config(['$routeProvider',function($routeProvider) {
  	$routeProvider
  	.when('/category',{
  		templateUrl:'yike_category/category.html',
  		controller:'CategoryController',
  	})
  }]);

  module.controller('CategoryController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

	$rootScope.title = '栏目浏览';
	$rootScope.index = 3;
	$rootScope.loaded = false;

	$http({
		url: './api/category.php',
	}).success(function(info) {

		$rootScope.loaded = true;

		// console.log(info.columns);

		$scope.categorys = info.columns;

	});

}])

})(angular);