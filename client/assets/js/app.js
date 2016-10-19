(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .controller('SpellsController', SpellsController)
    .controller('DetalleController', DetalleController)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

  SpellsController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
  function SpellsController($scope, $stateParams, $state, $controller, $http) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    var clase = $stateParams.clase;
    var url = "http://dnd5.tr4ck.net/"+clase;

    $scope.hechizos = $http.get(url).success(function(data, status, headers, config) {
      //console.log(data);
      $scope.hechizos = data;
    });
  }

  DetalleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];
  function DetalleController($scope, $stateParams, $state, $controller, $http) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    var spellid = $stateParams.spellid;
    var url = "http://dnd5.tr4ck.net/spell/"+spellid;

    $http.get(url).success(function(data, status, headers, config) {
      //console.log(data);
      $scope.hechizo = data;
    });

    $scope.spell_link = function(param){
      console.log(param);
    }

  }


})();
