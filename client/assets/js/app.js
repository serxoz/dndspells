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
    .controller('FavsController', FavsController)
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
      data.sort(function(a, b){
        return parseFloat(a.nivel) - parseFloat(b.nivel);
      });
      $scope.hechizos = data;
    });
  }

  FavsController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http', '$localstorage'];
  function FavsController($scope, $stateParams, $state, $controller, $http, $localstorage) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    var spells = [];
    var spells_id = [];
    try {
      spells_id = $localstorage.get("spells").split(',');
    }
    catch(err) {
      console.log("No favourite spell!");
    };
    spells_id.forEach(function(spellid) {
      if (spellid !== 'false'){
        console.log(spellid);
        var url = "http://dnd5.tr4ck.net/spell/"+spellid;

        $http.get(url).success(function(data, status, headers, config) {
          //console.log(data);
           spells.push(data);
        });

      }
    });

    $scope.hechizos = spells;
  }

  DetalleController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http', '$localstorage'];
  function DetalleController($scope, $stateParams, $state, $controller, $http, $localstorage) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    var spellid = $stateParams.spellid;
    var url = "http://dnd5.tr4ck.net/spell/"+spellid;

    $http.get(url).success(function(data, status, headers, config) {
      //console.log(data);
      $scope.hechizo = data;

      // Comprobar si es favorito:
      var favoritos = $localstorage.get("spells");
      try {
        if (favoritos.indexOf(spellid) !== -1) {
          $scope.hechizo.favorito = true;
          console.log("Es favorito");
          console.log($scope.hechizo.favorito);
        }
      } catch(err) {
        console.log(err);
        console.log("No favourite spell!");
      }

    });

    // Activar y desactivar favorito
    $scope.favorito = function(spellid) {
      var spells = [];
      try {
        spells = $localstorage.get("spells").split(',');
      }
      catch(err) {
        console.log("No favourite spell!");
      };

      if ($scope.hechizo.favorito === true) {
        var index = spells.indexOf(spellid);
        spells.splice(index, 1);
        $scope.hechizo.favorito = false;

      } else {
        spells.push(spellid);
        $scope.hechizo.favorito = true;
      }

      $localstorage.set("spells", spells);
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
