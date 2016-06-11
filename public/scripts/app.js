'use strict';

angular.module('condominiumApp', ['ui.router', 'ngResource', 'ngDialog'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            // route for the home page
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html',
                        controller: 'HeaderController'
                    },
                    'content': {
                        templateUrl: 'views/home.html',
                        controller: 'HomeController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html',
                    }
                }

            })

            // route for the residents page
            .state('app.residents', {
                url: 'residents',
                views: {
                    'content@': {
                        templateUrl: 'views/residents.html',
                        controller: 'ResidentsController'
                    }
                }
            })

            // route for the residentdetail page
            .state('app.residentdetails', {
                url: 'residents/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/residentdetail.html',
                        controller: 'ResidentDetailController'
                    }
                }
            })

            // route for the buildings page
            .state('app.buildings', {
                url: 'buildings',
                views: {
                    'content@': {
                        templateUrl: 'views/buildings.html',
                        controller: 'BuildingsController'
                    }
                }
            })

            // route for the buildingdetail page
            .state('app.buildingdetails', {
                url: 'buildings/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/buildingdetail.html',
                        controller: 'BuildingDetailController'
                    }
                }
            })

            // route for the notice boards page
            .state('app.noticeboards', {
                url: 'noticeboards',
                views: {
                    'content@': {
                        templateUrl: 'views/noticeboards.html',
                        controller: 'NoticeBoardsController'
                    }
                }
            })

            // route for the letters page
            .state('app.letters', {
                url: 'letters',
                views: {
                    'content@': {
                        templateUrl: 'views/letters.html',
                        controller: 'LettersController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });
