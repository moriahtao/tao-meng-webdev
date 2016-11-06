(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        console.log("hello from sortable");
        var widgets = $(".wam-sortable").sortable({
            axis: 'y'
        });
        console.log(widgets);
    }
})();
