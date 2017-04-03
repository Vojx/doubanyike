(function(angular){

  var module = angular.module('Yike.settings',['ngRoute']);

  module.config(['$routeProvider',function($routeProvider) {
  	$routeProvider
  	.when('/settings',{
  		templateUrl:'yike_settings/settings.html',
  		controller:'SettingsController',
  	})
  }]);

  module.controller('SettingsController', ['$rootScope', function($rootScope) {

	$rootScope.title = '设置';
	$rootScope.index = 5;
	$rootScope.loaded = true;

}])


})(angular);