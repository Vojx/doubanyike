var servise = angular.module('Servise',[]);

servise.factory('Reddit', function($http,$rootScope) {
    var Reddit = function() {
        this.items = [];
        this.busy = false;
        this.after = '';
    };

    Reddit.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;
        // 热门作者(加载更多)
        var url = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6&start=' + this.after;
        //var url = "https://api.reddit.com/hot?after=" + this.after;
        $http.get(url).success(function(info) {
            console.log(info);

            $rootScope.loaded = true;
            // var items = info.authors.children;
            var items = info.authors;

            for (var i = 0; i < items.length; i++) {

                this.items.push(items[i]);
            }

            console.log(this.items);
            this.after = info.start;
            this.busy = false;
        }.bind(this));
    };

    return Reddit;
});
