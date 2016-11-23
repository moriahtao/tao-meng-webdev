(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        console.log("hello from sortable");
        var start = -1;
        var end = -1;
        function linker (scope, element, attributes){
            $(element)
                .sortable({
                axis: 'y',
                start: function (event, ui) {
                    start = ($(ui.item).index());
                },
                stop: function (event, ui) {
                    end = ($(ui.item).index());
                    scope.sortableController.sort(start, end);
                }
        });
    }
    return{
        scope: {},
        link: linker,
        controller: sortableController,
        controllerAs: 'sortableController'
    }
    }
    function sortableController(WidgetService, $routeParams){

        var vm = this;
        vm.sort = sort;
        vm.pageId = $routeParams.pid;

        function sort(start, end){
            WidgetService.sort(start, end, vm.pageId);

        }

    }
       /*var widgets = $(".wam-sortable").sortable({
           axis: 'y',
           start: function (event, ui) {
              start = ($(ui.item).index());
           },
           stop: function (event, ui) {
               end = ($(ui.item).index());
           }

        });*/
        //console.log(widgets);

})();
