(function(angular) {

    var module = angular.module('Yike.myLove', ['ngRoute']);

    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/myLove', {
                templateUrl: 'yike_myLove/myLove.html',
                controller: 'myLoveController',
            })
    }]);

    module.controller('myLoveController', [
        '$scope',
        '$http',
        '$filter',
        '$rootScope',
        function($scope, $http, $filter, $rootScope) {
            //获得时间
            $rootScope.title = '我的喜欢';
            $rootScope.index = 4;
            $rootScope.loaded = true;
        }
    ])

})(angular);
