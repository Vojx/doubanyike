(function(angular) {
    // 作者的详细内容
    var module = angular.module('Yike.author_detail', []);

    module.controller('AuthorDetailController', [
        '$scope',
        '$rootScope',
        '$http',
        '$routeParams',
        function($scope, $rootScope, $http, $routeParams) {

            $scope.author = '';
            $scope.posts = '';
            $rootScope.loaded = false;
            $scope.curId = $routeParams.id;

            $http({
                url: 'api/author_detail.php',
                method: 'get',
                params: {
                    id: $routeParams.id
                }
            }).then(function(info) {
                // console.log(info.data);
                $rootScope.loaded = true;
                $rootScope.title = info.data.author.name;
                $scope.author = info.data.author;
                $scope.posts = info.data.posts;

            }, function() {
                console.log('数据获取出错');
            });


        }
    ]);

})(angular);
