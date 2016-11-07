(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http){
        var pages= [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }

        ];


        var api={
            findAllPagesForWebsite: findAllPagesForWebsite,
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage

        };
        return api;

        function findAllPagesForWebsite(websiteId){
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);

        }

      function findPageById(id){
            var url = "/api/page/" + id;
            return $http.get(url);
        }

        function createPage(websiteId, page){
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function updatePage(pageId, page){
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId){
            var url = "/api/page/" + pageId;
            return $http.delete(url);

        }
    }
})();

