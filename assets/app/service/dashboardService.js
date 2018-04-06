(function(){
    'use strict';
    
    angular.module('MLGCLPortal').factory('dashboardService',[
        '$http',
        'httpRequestService',
        '$q',
        'configurationService',
        dashboardService
    ]);
    
    
    function dashboardService(
        $http,
        httpRequestService,
        $q,
        configurationService
    )
    {
        var dashboardFactory = {};
    
        dashboardFactory.login = function(data){
            var url = 'login';
            var defer = $q.defer();
            httpRequestService.post(url,data,function(response){
                dashboardFactory.data = response.data;
                return defer.resolve(response);
            }, function (error) {
                dashboardFactory.data = [];
                return defer.reject(error);
            });
            return defer.promise;
        };
        
        return dashboardFactory;
    }
})();