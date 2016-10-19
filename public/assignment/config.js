/*all the code is protected within IIFE namespace*/
(function() {
    angular
        .module("WebAppMaker")/*refer to the top level module created in app.js*/
        .config(Config);

    function Config($routeProvider) {/*Config will be invoked by the framework with arguments I am gonna ask for
                                        CALLED inversion of control. We ask for things that already exist in the framework
                                        Config asks for an instance of an object with a particular name: routeProvider
                                        this is a framework variable.
                                        All variable created by Angular start with a $ sign*/
        $routeProvider/*this particular object is used for navigation*/
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"model"
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model"
            })
            .when("/website/new", {
                templateUrl: "views/website/website-new.view.client.html"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller:"WebsiteEditController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller:"PageListController",
                controllerAs:"model"
            })
            .when("/website/page/edit", {
                templateUrl: "views/page/page-edit.view.client.html"
            })
            .when("/website/page/new", {
                templateUrl: "views/page/page-new.view.client.html"
            })
            .when("/website/page/widget", {
                templateUrl: "views/widget/widget-list.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            });




    }
})();

