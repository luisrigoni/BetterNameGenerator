﻿///#source 1 1 /app/app.js
var nameApp = angular

    .module('nameApp', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/',
            {
                controller: 'nameController',
                templateUrl: '/app/views/form.html'
            })
            .when('/result/:gender/:name',
            {
                controller: 'resultController',
                templateUrl: '/app/views/result.html'
            })
            .otherwise(
            {
                redirectTo: '/'
            });
    }]);
///#source 1 1 /app/services/nameFactory.js
/* globals nameApp */

nameApp.factory('nameFactory', function () {

    var factory = {},
        names = {
            "boys": [
                "Sancoon",
                "Bjort",
                "Crawgy",
                "Bootan",
                "Roll",
                "Tallo",
                "Farticus",
            ],
            "girls": [
                "Ingroan",
                "Bamsa",
                "Fooleen",
                "Dolla",
                "Flatulla",
                "Bawlina",
            ],
            "last": [
                "Smalingo",
                "Diccus",
                "deFunky",
                "Bulldunk",
            ]
        };

    factory.getBetterName = function (gender, name) {

        var list = gender === "male" ? names.boys : names.girls;
        var hash = (gender + name.toLowerCase()).hashCode();

        var first = Math.abs(hash % list.length);
        var last = Math.abs(hash % names.last.length);

        return list[first] + " " + names.last[last];
    };

    String.prototype.hashCode = function () {
        var hash = 0;
        if (this.length === 0) return hash;
        for (var i = 0; i < this.length; i++) {
            var character = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    return factory;
});
///#source 1 1 /app/services/testimonialfactory.js
/* globals nameApp */

nameApp.factory('testimonialFactory', function () {

    var factory = {},
        testimonials = [
        {
            "quote": "My final toe developed in just 3 days. Thanks Numberology!",
            "author": "Joozy Socker",
        },
        {
            "quote": "I never have to stand in line at the bakery any more.",
            "author": "Sanco Bulldunk",
        }
        ];

    factory.getTestimonial = function () {
        var rnd = Math.random(),
            index = Math.round(rnd % testimonials.length);

        return testimonials[index];
    };

    return factory;
});
///#source 1 1 /app/controllers/resultController.js
/* globals nameApp */

nameApp.controller('resultController', ['$scope', '$route', 'nameFactory', function ($scope, $route, nameFactory) {

    var gender = $route.current.params.gender;
    var name = $route.current.params.name;

    function init() {
        $scope.result = nameFactory.getBetterName(gender, name);
        
        var names = name.split('-');
        $scope.firstName = names.length === 0 ? name : names[0];
    }
    
    init();
}]);
///#source 1 1 /app/controllers/nameController.js
/* globals nameApp */

nameApp.controller('nameController', ['$scope', '$location', 'testimonialFactory', function ($scope, $location, testimonialFactory) {

    $scope.name = '';
    $scope.gender = '';
    $scope.testimonial = {};

    $scope.generate = function () {
        if (localStorage) {
            localStorage.name = $scope.name;
            localStorage.gender = $scope.gender;
        }

        $location.path('/result/' + $scope.gender + '/' + $scope.name.replace(/ /ig, "-").toLowerCase());
    };

    function init() {
        if (localStorage) {
            $scope.name = localStorage.getItem('name');
            $scope.gender = localStorage.getItem('gender') || 'male';
        }
        
        var t = testimonialFactory.getTestimonial();
        
        $scope.testimonial.quote = t.quote;
        $scope.testimonial.name = t.author;
    }

    init();

}]);