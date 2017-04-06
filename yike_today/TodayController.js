(function(angular) {

    var module = angular.module('Yike.today', ['ngRoute']);

    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/today', {
                templateUrl: 'yike_today/today.html',
                controller: 'TodayController',
            })
            .when('/today/:id', {
                templateUrl: 'yike_today/today_moreContent.html',
                controller: 'TodayController',
            })
    }]);

    module.controller('TodayController', [
        '$scope',
        '$http',
        '$filter',
        '$rootScope',
        '$routeParams',
        function($scope, $http, $filter, $rootScope, $routeParams) {
            //获得时间
            var today = $filter('date')(new Date, 'yyyy-MM-dd');
            $rootScope.title = '今日一刻';
            $rootScope.index = 0;
            $rootScope.loaded = false;

            $http({
                url: './api/today.php',
                method: 'get',
                params: {
                    today: today
                }

            }).success(function(info) {
                // console.log(info);

                $rootScope.loaded = true;

                $scope.date = info.date;
                $scope.posts = info.posts;

                for (var i = 0, len = info.posts.length; i < len; i++) {
                    if ($routeParams.id == info.posts[i].id) {
                        $scope.content = info.posts[i].content;
                    }
                };

            }).error(function() {
                console.log('出错了');
            });

        }
    ])

})(angular);
