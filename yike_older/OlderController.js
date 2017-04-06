(function(angular) {
    //往期内容
    var module = angular.module('Yike.older', ['ngRoute', 'ngSanitize']);

    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/older', {
                templateUrl: 'yike_older/older.html',
                controller: 'OlderController',
            })
            .when('/older/:id', {
                templateUrl: 'yike_older/older_moreContent.html',
                controller: 'OlderController',
            })
    }]);

    module.controller('OlderController', [
    	'$scope',
    	'$http', 
    	'$filter', 
    	'$rootScope',
    	'$routeParams',
    	 function($scope, $http, $filter, $rootScope,$routeParams) {

        $rootScope.title = '往期内容';
        $rootScope.index = 1;
        $rootScope.loaded = false;

        // 
        $http({
            url: './api/older.php', // 
        }).success(function(info) {

            $rootScope.loaded = true;

            //console.log(info);

            $scope.date = info.date;
            $scope.posts = info.posts;

            for (var i = 0, len = info.posts.length; i < len; i++) {
                if ($routeParams.id == info.posts[i].id) {
                    $scope.content = info.posts[i].content;
                }
            };
        });

    }])

})(angular);
