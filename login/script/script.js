'use strict';

$(document).ready(function(){
    
    var baseApiUrl = '';

    $.ajax({
        url : '/config.json',
        type : 'GET',
        success : function(response){
            baseApiUrl=response.resource;
        }
    });

    var loginForm = $('form#portalLoginForm');
    var token = window.localStorage.getItem('mlgportal_token');
    if (token) {
        window.location.assign('/');
    }

    loginForm.on('submit', function(e) {
        e.stopPropagation();
        var username = $('#username').val();
        var password = $('#password').val();

        if (username && password) {
            $.ajax({
                url: baseApiUrl + 'login',
                type: "POST",
                data: 'grant_type=password&username=' + username + '&password=' + password,
                contentType: "application/x-www-form-urlencoded",
                success: function(response, textStatus, xhr) {
                    var token = response.access_token;
                    window.localStorage.setItem('mlgportal_token', 'Bearer ' + token);
                    window.localStorage.setItem('mlgportal_baseUrl', baseApiUrl);
                    window.location.assign('/');
                },
                error: function(xhr, status, e) {
                    sweetAlert({
                        title: "Oops something's not right",
                        text: "Please check your username and password is correct.",
                        type: "error"
                    });
                }
            });
        } else {
            sweetAlert({
                title: "Oops something's not right",
                text: "Please check your username and password is correct.",
                type: "error"
            });
        }
    });
});