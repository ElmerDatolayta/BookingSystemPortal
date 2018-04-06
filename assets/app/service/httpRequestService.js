(function(){
    'use strict';
    
    angular.module('MLGCLPortal').factory('httpRequestService', ['$http','configurationService','$window','$q', httpRequestService]);
    
    function httpRequestService($http,configurationService,$window,$q) {
        var baseUrl = window.localStorage.getItem('mlgportal_baseUrl') + 'api/';
        var token = $window.localStorage.getItem('mlgportal_token');
        $http.defaults.headers.common.Authorization = token;
        var errorCallback = function (e) {
            var errorStatus = [404, 400, 500];
            var errorMessage;
            switch (e.status) {
                case 400:
                    errorMessage = e.data.Message;
                    break;
                default:
                    errorMessage = e.statusText;
                    break;
            }
            if (errorStatus.indexOf(e.status) !== -1) {
                SweetAlert.swal("Yikes! Something is wrong", errorMessage, "error");
            } else if (e.status === 401) {
                $window.localStorage.removeItem('mlgportal_token');
                $window.location.assign(configurationService.resources.login);
            }
        };
    
        var getMethod = function (url, succesCallback) {
            $http.get(baseUrl + url).then(succesCallback, errorCallback);
        };
    
        var postMethod = function (url, data, successCallback) {
            $http.post(baseUrl + url,data).then(successCallback, errorCallback);
        };
    
        var putMethod = function (url, data, successCallback) {
            $http.put(baseUrl + url, data).then(successCallback, errorCallback);
        };
    
        var deleteMethod = function (url, successCallback) {
            $http.delete(baseUrl + url).then(successCallback, errorCallback);
        };
    
        return {
            get: getMethod,
            post: postMethod,
            put: putMethod,
            delete: deleteMethod
        }
    
    }    
})();