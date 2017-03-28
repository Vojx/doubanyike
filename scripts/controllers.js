//实例一个模块，用来专门管理所有的控制器
angular.module('Controllers', ['ngRoute','Servise','infinite-scroll'])

//导航
.controller('NavController', ['$scope', function($scope) {

	$scope.navs = [{
		link: '#/today',
		text: '今日一刻',
		icon: 'icon-home'
	}, {
		link: '#/older',
		text: '往期内容',
		icon: 'icon-file-empty'
	}, {
		link: '#/auther',
		text: '热门作者',
		icon: 'icon-pencil'
	}, {
		link: '#/category',
		text: '栏目浏览',
		icon: 'icon-menu'
	}, {
		link: '#/favourite',
		text: '我的喜欢',
		icon: 'icon-heart'
	}, {
		link: '#/settings',
		text: '设置',
		icon: 'icon-cog'
	}];



}])

//今日一刻
.controller('TodayController', ['$scope', '$http', '$filter', '$rootScope', function($scope, $http, $filter, $rootScope) {
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
		// console.log(info.posts);

		$rootScope.loaded = true;

		$scope.date = info.date;
		$scope.posts = info.posts;

	}).error(function() {
		console.log('出错了');
	});

}])

//往期内容
.controller('OlderController', ['$scope', '$http', '$filter', '$rootScope', function($scope, $http, $filter, $rootScope) {

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
	});

}])

//热门作者
.controller('AuthorController', ['$scope', '$http', '$rootScope', 'Reddit',function($scope, $http, $rootScope,Reddit) {

	$rootScope.title = '热门作者';
	$rootScope.index = 2;
	$rootScope.loaded = false;

	$http({
		url: './api/author.php',
	}).success(function(info) {

		$rootScope.loaded = true;

		$scope.recAuthors = info.rec.authors;

	});

	//获得更多的作者
	 $scope.reddit = new Reddit();

}])

//栏目浏览
.controller('CategoryController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

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

//当前栏目
.controller('ListController', ['$scope', '$http', '$rootScope', '$routeParams',function($scope, $http, $rootScope,$routeParams) {

	$rootScope.title = '文章列表';
	$rootScope.loaded = false;

	$http({
		url: './api/cur_category.php',
		method:'get',
		params:{
			//这里最精彩,将ID通过锚点值传参
			curId : $routeParams.id
		}

	}).success(function(info) {

		$rootScope.loaded = true;

		// console.log(info.posts);

		$scope.list = info.column;

		$scope.posts = info.posts;
	});


}])


//我的喜欢
.controller('FavouriteController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

	$rootScope.title = '我的喜欢';
	$rootScope.index = 4;
	$rootScope.loaded = true;

	// $http({
	// 	url: './api/category.php',
	// }).success(function(info) {

	// 	$rootScope.loaded = true;

	// 	console.log(info.columns);

	// 	$scope.categorys = info.columns;
	// });

}])

//设置
.controller('SettingController', ['$rootScope', function($rootScope) {

	$rootScope.title = '设置';
	$rootScope.index = 5;
	$rootScope.loaded = true;

}])