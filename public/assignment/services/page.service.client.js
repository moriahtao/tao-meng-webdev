(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){
        var pages= [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }

        ];


        var api={
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById
        };
        return api;

        function findPagesByWebsiteId(websiteId){
            var result = [];
            for(var u in pages){
                var page = pages[u];
                if (page.websiteId === websiteId){
                    result.push(pages[u]);
                }
            }
            return result;

        }

        function findPageById(id){
            for(var u in pages){
                var page = pages[u];
                if(page._id === id){
                    return page;
                }
            }
            return null;
        }
    }
})();

