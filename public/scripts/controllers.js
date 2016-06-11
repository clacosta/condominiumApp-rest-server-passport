'use strict';

angular.module('condominiumApp')

    .controller('ResidentsController', ['$scope', 'residentsFactory', function ($scope, residentsFactory) {

        $scope.residents = residentsFactory.query();

    }])

    .controller('ResidentDetailController', ['$scope', '$state', '$stateParams', 'residentsFactory', function ($scope, $state, $stateParams, residentsFactory) {

        $scope.resident = {};
        $scope.showResident = false;
        $scope.message = "Loading ...";

        $scope.resident = residentsFactory.get({
            id: $stateParams.id
        })
            .$promise.then(
            function (response) {
                $scope.resident = response;
                $scope.showResident = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

    }])

    .controller('BuildingsController', ['$scope', 'buildingsFactory', function ($scope, buildingsFactory) {

        $scope.buildings = buildingsFactory.query();

    }])

    .controller('BuildingDetailController', ['$scope', '$state', '$stateParams', 'buildingsFactory', 'residentsFactory', function ($scope, $state, $stateParams, buildingsFactory, residentsFactory) {

        $scope.buildings = {};
        $scope.residentesBuilding = {};
        $scope.showBuilding = false;
        $scope.showResidentes = false;
        $scope.message = "Loading ...";

        $scope.building = buildingsFactory.get({
            id: $stateParams.id
        })
            .$promise.then(
            function (response) {
                $scope.building = response;
                $scope.showBuilding = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

        var residentesBuilding = residentsFactory.query({
            building: $stateParams.id
        })
            .$promise.then(
            function (response) {
                $scope.residentesBuilding = response;
                $scope.showResidentes = ($scope.residentesBuilding.length > 0);
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

    }])

    .controller('NoticeBoardsController', ['$scope', 'noticeboardsFactory', function ($scope, noticeboardsFactory) {

        $scope.noticeboards = noticeboardsFactory.query();

    }])

    .controller('LettersController', ['$scope', 'lettersFactory', function ($scope, lettersFactory) {

        $scope.letters = lettersFactory.query();

    }])

    .controller('HomeController', ['$scope', 'residentsFactory', 'buildingsFactory', 'noticeboardsFactory', function ($scope, residentsFactory, buildingsFactory, noticeboardsFactory) {

        $scope.message = "Loading ...";
        $scope.residentsCount = 0;
        $scope.buildingsCount = 0;

        $scope.residentsCount = residentsFactory.query({
        })
            .$promise.then(
            function (response) {
                $scope.residentsCount = response.length;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

        $scope.buildingsCount = buildingsFactory.query({
        })
            .$promise.then(
            function (response) {
                $scope.buildingsCount = response.length;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

        $scope.noticeboards = noticeboardsFactory.query({
            messageType: 0
        })
            .$promise.then(
            function (response) {
                $scope.noticeboards = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

    }])

    .controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

        $scope.loggedIn = false;
        $scope.username = '';

        if (AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
        }

        $scope.openLogin = function () {
            ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController" });
        };

        $scope.logOut = function () {
            AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
        };

        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });

        $rootScope.$on('registration:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });

        $scope.stateis = function (curstate) {
            return $state.is(curstate);
        };

    }])

    .controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

        $scope.loginData = $localStorage.getObject('userinfo', '{}');

        $scope.doLogin = function () {
            if ($scope.rememberMe)
                $localStorage.storeObject('userinfo', $scope.loginData);

            AuthFactory.login($scope.loginData);

            ngDialog.close();

        };

        $scope.openRegister = function () {
            ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController" });
        };

    }])

    .controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

        $scope.register = {};
        $scope.loginData = {};

        $scope.doRegister = function () {
            console.log('Doing registration', $scope.registration);

            AuthFactory.register($scope.registration);

            ngDialog.close();

        };
    }]);