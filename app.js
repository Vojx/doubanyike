var Yike = angular.module('Yike', [
	'ngRoute', 
	'Yike.today',
	'Yike.older',
	'Yike.author',
	'Yike.author_detail',
	'Yike.category',
	'Yike.category_list',
	'Yike.myLove',
	'Yike.settings',
	]);

Yike.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/today'
	});
}]);

//导航
Yike.controller('NavController', ['$scope', function($scope) {
	$scope.navs = [{
		link: '#/today',
		text: '今日一刻',
		icon: 'icon-home'
	}, {
		link: '#/older',
		text: '往期内容',
		icon: 'icon-file-empty'
	}, {
		link: '#/author',
		text: '热门作者',
		icon: 'icon-pencil'
	}, {
		link: '#/category',
		text: '栏目浏览',
		icon: 'icon-menu'
	}, {
		link: '#/myLove',
		text: '我的喜欢',
		icon: 'icon-heart'
	}, {
		link: '#/settings',
		text: '设置',
		icon: 'icon-cog'
	}];
}]);


Yike.run(['$rootScope', function ($rootScope) {
	// 设置类名初始值
	$rootScope.collapsed = false;
	// 全局方法
	$rootScope.toggle = function () {
		// console.log(1);
		// 改变类名初始值
		$rootScope.collapsed = !$rootScope.collapsed;

		// 获取所有导航
		var navs = document.querySelectorAll('.navs dd');

		if($rootScope.collapsed) {
			// console.log('打开');
			for(var i=0; i<navs.length; i++) {
				navs[i].style.transform = 'translate(0)';
				navs[i].style.transitionDelay = '0.2s';
				navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
			}
		} else {
			// console.log('关闭');
			// 6 
			// 6 - 1
			var len = navs.length - 1;
			for(var j=len; j>0; j--) {
				// console.log(navs.length - j + 1);
				navs[j].style.transform = 'translate(-100%)';
				navs[j].style.transitionDelay = '';
				navs[j].style.transitionDuration = (len - j) * 0.15 + 's';
			}
		}
	}


}]);


