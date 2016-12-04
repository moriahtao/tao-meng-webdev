(function () {
    angular
        .module("MovieTalks!")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/user/home.view.client.html"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })

            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html"
            })
            .when("/personalinfo", {
                templateUrl: "views/user/personalinfo.view.client.html"
            })
            .when("/follower", {
                templateUrl: "views/user/follower.view.client.html"
            })
            .when("/following", {
                templateUrl: "views/user/following.view.client.html"
            })
            .when("/search", {
                templateUrl: "views/user/search.view.client.html"
            })
            .when("/:uid/results", {
                templateUrl: "views/movie/movie-search-list.view.client.html"
            })
            .when("/:uid/movies", {
                templateUrl: "views/movie/movie-user-list.view.client.html"
            })
            .when("/:uid/reviews", {
                templateUrl: "views/movie/movie-user-list.view.client.html"
            })
            .otherwise({
                redirectTo: "/home"
            });

    }
})();