﻿var nameApp = angular

    .module('nameApp', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/',
            {
                controller: 'nameController',
                templateUrl: '/app/views/form.min.html'
            })
            .when('/result/:gender/:name',
            {
                controller: 'resultController',
                templateUrl: '/app/views/result.min.html'
            })
            .otherwise(
            {
                redirectTo: '/'
            });
    }]);