(function(angular) {
    //热门作者以及加载更多作者
    var module = angular.module('Yike.author', ['ngRoute', 'Servise', 'infinite-scroll']);

    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/author', {
                templateUrl: 'yike_author/author.html',
                controller: 'AuthorController',
            })
            .when('/author/:authorId', {
                templateUrl: 'yike_author_detail/author_detail.html',
                controller: 'AuthorDetailController',
            })
            .when('/author/:authorId/:postId', {
                templateUrl: 'yike_author_detail/author_moreContent.html',
                controller: 'AuthorDetailController',
            })

    }]);

    module.controller('AuthorController', [
        '$scope', 
        '$http', 
        '$rootScope', 
        'Reddit', 
        function($scope, $http, $rootScope, Reddit) {

        $rootScope.title = '热门作者';
        $rootScope.index = 2;
        $rootScope.loaded = false;

        $http({
            url: './api/author.php',
        }).success(function(info) {
            // console.log(info);
            $rootScope.loaded = true;

            $scope.recAuthors = info.rec.authors;

            var url = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6&start='

            //获得更多的作者
            $scope.reddit = new Reddit(url);


        }).error(function() {
            console.log('出错了');
        });

    }])




})(angular);
