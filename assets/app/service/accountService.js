(function(){
    'use strict';
    
    angular.module('MLGCLPortal').factory('accountService',[
        '$http',
        'httpRequestService',
        '$q',
        'configurationService',
        accountService
    ]);
    
    
    function accountService(
        $http,
        httpRequestService,
        $q,
        configurationService
    )
    {
        var accountFactory = {};
    
        accountFactory.getUserInfo = function(){
            var url = 'account/getUserInfo';
            var defer = $q.defer();
            httpRequestService.get(url,function(response){
                accountFactory.data = response.data;
                return defer.resolve(response);
            }, function (error) {
                accountFactory.data = [];
                return defer.reject(error);
            });
            return defer.promise;
        };
        
        return accountFactory;
    }
})();