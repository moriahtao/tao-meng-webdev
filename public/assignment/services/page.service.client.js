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
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage

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

        function createPage(websiteId, page){
           {var newPage = {
                _id: (new Date()).getTime() + "",
                name: page.name,
                websiteId: websiteId,
                description: page.description
            };

                pages.push(newPage);
                return newPage;}
        }

        function updatePage(pageId, page){
            for(var u in pages){
                if(pages[u]._id === pageId){
                    pages[u].name = page.name;
                    pages[u].description = page.description;
                    return true;
                }
            }
          return null
        }
    }
})();

