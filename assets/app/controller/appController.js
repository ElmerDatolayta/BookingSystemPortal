(function(){
    'use strict';
    angular.module('MLGCLPortal').controller('appController',[
        '$scope',
        '$http',
        'configurationService',
        '$window',
        '$q',
        '$state',
        'accountService',
         appController]);

    function appController(
        $scope,
        $http,
        configurationService,
        $window,
        $q,
        $state,
        accountService
    )
    {
    
        var vm = this;

        /** VM Variables */
        vm.userInfo = {};


        /** VM Function Caller */
        vm.logOut = logOut;
        vm.menu = configurationService;
    
        getConfiguration().then(function(prom){
            configurationService.resources.resource = prom.data.resource;
            configurationService.resources.login = prom.data.login;
            checkToken().then(function(promise){
                if(promise){
                    configurationService.userInfo.token = promise;
                    init();
                }
            },function(err){
                $window.location.assign(configurationService.resources.login);
            })
        });

        function init(){
            getUserInfo();
        }
    
        function getConfiguration(){
            var defer = $q.defer();
            $http.get('/config.json').then(function(response){
                defer.resolve(response);
            },function(){
                defer.reject('Invalid Json File');
            });
            return defer.promise;
        }
    
        function logOut(){
            $window.localStorage.removeItem('mlgportal_token');
            $window.location.assign(configurationService.resources.login);
        }
    
        function checkToken(){
            var defer = $q.defer();
            var token = $window.localStorage.getItem('mlgportal_token');
            if(token){
                defer.resolve(token);
            }else{
                defer.reject("Invalid Token");
            }
            return defer.promise;
        }

        function getUserInfo(){
            accountService.getUserInfo().then(function(response){
                vm.userInfo = response.data;
            });
        }
    }
    
})();