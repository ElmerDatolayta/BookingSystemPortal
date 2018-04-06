(function(){
    'use strict';
    angular.module('MLGCLPortal').factory('configurationService', ['$http', configurationService]);
    
    function configurationService($http){
        var factory = {};
    
        factory.userInfo = {
            userId : 0,
            roleId : 0,
            token : ''
        };
        
        factory.resources = {
            resource : ''
        };

        factory.menu = {
            state : {}
        }
        
    
        return factory;
    }
})();