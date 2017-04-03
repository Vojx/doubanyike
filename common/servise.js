var servise = angular.module('Servise',[]);

servise.factory('Reddit', function($http,$rootScope) {
    var Reddit = function(url) {
        this.url = url;
        this.items = [];
        this.busy = false;
        this.after = '';
    };

    Reddit.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;
        // 热门作者(加载更多)
        // console.log(this.url);
        var get_url = this.url + this.after;
        //var url = "https://api.reddit.com/hot?after=" + this.after;
        $http.get(get_url).success(function(info) {
            // console.log(info);

            $rootScope.loaded = true;
            // var items = info.authors.children;
            var items = info.authors;

            for (var i = 0; i < items.length; i++) {

                this.items.push(items[i]);
            }

            // console.log(this.items);
            this.after = info.start;
            this.busy = false;
        }.bind(this));
    };

    return Reddit;
});
