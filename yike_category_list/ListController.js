(function(angular) {

    var module = angular.module('Yike.category_list', ['ngRoute']);

    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/category/:id', {
                templateUrl: 'yike_category_list/list.html',
                controller: 'ListController',
            })
    }]);

    module.controller('ListController', ['$scope', '$http', '$rootScope', '$routeParams', function($scope, $http, $rootScope, $routeParams) {

        $rootScope.title = '文章列表';
        $rootScope.loaded = false;

        $http({
            url: './api/cur_category.php',
            method: 'get',
            params: {
                //这里最精彩,将ID通过锚点值传参
                curId: $routeParams.id
            }

        }).success(function(info) {

            $rootScope.loaded = true;

            console.log(info);

            $scope.list = info.column;
            $scope.posts = info.posts;

            for (var i = 0, len = info.posts.length; i < len; i++) {
                if ($routeParams.postId == info.posts[i].id) {
                    $scope.content = info.posts[i].content;
                }
            };
        });


    }])

})(angular);
