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
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
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
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller:"WebsiteNewController",
                controllerAs:"model"
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

            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "PageEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller:"WidgetChooserController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller:"WidgetEditController",
                controllerAs:"model"
            })

            .otherwise({
                redirectTo: "/login"
            });




    }
})();

