(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'sticky',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .controller('SpellsController', SpellsController)
    .controller('DetalleController', DetalleController)
    .factory('$localstorage', StorageFactory)
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

  // CONTROLLERS
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

    $scope.favorito = function(spellid) {
      console.log(spellid);
    }

  }

  // FACTORIES
  StorageFactory.$inject = ['$window'];
  function StorageFactory($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || false;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        if($window.localStorage[key] != undefined){
          return JSON.parse( $window.localStorage[key] || false );
        }
        return false;
      },
      remove: function(key){
        $window.localStorage.removeItem(key);
      },
      clear: function(){
        $window.localStorage.clear();
      }
    }
  };

})();
