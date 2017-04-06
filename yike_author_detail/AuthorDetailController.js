(function(angular) {
    // 作者的详细内容
    var module = angular.module('Yike.author_detail', ['ngSanitize']);

    module.controller('AuthorDetailController', [
        '$scope',
        '$rootScope',
        '$http',
        '$routeParams',
        function($scope, $rootScope, $http, $routeParams) {

            $scope.author = '';
            $scope.posts = '';
            $scope.content = '';
            $rootScope.loaded = false;
            $scope.curId = $routeParams.authorId;

            $http({
                url: 'api/author_detail.php',
                method: 'get',
                params: {
                    id: $routeParams.authorId
                }
            }).then(function(info) {
                // console.log(info.data);
                $rootScope.loaded = true;
                $rootScope.title = info.data.author.name;
                $scope.author = info.data.author;
                $scope.posts = info.data.posts;

                for (var i = 0, len = info.data.posts.length; i < len; i++) {
                    if ($routeParams.postId == info.data.posts[i].id) {
                        $scope.content = info.data.posts[i].content;
                    }
                };

            }, function() {
                console.log('数据获取出错');
            });


        }
    ]);

})(angular);
