!function(){"use strict";function t(t,e){t.otherwise("/"),e.html5Mode({enabled:!1,requireBase:!1}),e.hashPrefix("!")}function e(){FastClick.attach(document.body)}function n(t,e,n,o,a){angular.extend(this,o("DefaultController",{$scope:t,$stateParams:e,$state:n}));var l=e.clase,r="http://dnd5.tr4ck.net/"+l;t.hechizos=a.get(r).success(function(e,n,o,a){t.hechizos=e})}function o(t,e,n,o,a){angular.extend(this,o("DefaultController",{$scope:t,$stateParams:e,$state:n}));var l=e.spellid,r="http://dnd5.tr4ck.net/spell/"+l;a.get(r).success(function(e,n,o,a){t.hechizo=e}),t.spell_link=function(t){console.log(t)}}angular.module("application",["ui.router","ngAnimate","foundation","foundation.dynamicRouting","foundation.dynamicRouting.animations"]).config(t).controller("SpellsController",n).controller("DetalleController",o).run(e),t.$inject=["$urlRouterProvider","$locationProvider"],n.$inject=["$scope","$stateParams","$state","$controller","$http"],o.$inject=["$scope","$stateParams","$state","$controller","$http"]}();