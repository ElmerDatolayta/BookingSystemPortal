(function(){
    'use strict';
    angular.module('MLGCLPortal').controller('dashboardController',[
        '$scope',
        'dashboardService',
        '$http',
        'configurationService',
        '$state',
        dashboardController]);

    function dashboardController(
        $scope,
        dashboardService,
        $http,
        configurationService,
        $state
    )
    {
        var vm = this;
        configurationService.menu = $state.current;
        vm.menu = configurationService.menu;

        function test(){
            $http.get('http://localhost:35591/api/test?uname=datz&pass=datzssssss').then(function(response){
                $scope.test = response.data;
            });
        }
        test();
    }
})();