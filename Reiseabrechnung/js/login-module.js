(function() {

  'use strict';

  var fileInput = function ($parse) {
    return {
      restrict: "EA",
      template: "<input type='file' />",
      replace: true,          
      link: function (scope, element, attrs) {

        var modelGet = $parse(attrs.fileInput);
        var modelSet = modelGet.assign;
        var onChange = $parse(attrs.onChange);

        var updateModel = function () {
          scope.$apply(function () {
            modelSet(scope, element[0].files[0]);
            onChange(scope);
          });                    
        };
         
        element.bind('change', updateModel);
      }
    };
  };

  var login = angular.module('loginModule', ['sharedServicesModule']);
  //alert('loginModule');

  login.run(['$rootScope', '$location', '$state', 'loginService', 
  function($rootScope, $location, $state, loginService) {
    $rootScope.$on('$stateChangeStart', 
      function(e, toState, toParams, fromState, fromParams) {
        //alert('from: ' + fromState.name + ' to: ' + toState.name);
        //alert('wants to go to ' + toState.name);
        var isLogout = toState.name === "logout";
        if(isLogout) {
          loginService.logout();
          e.preventDefault(); // stop current execution
          $state.go('login'); // go to login
        }
        var isLoginOrRegisterOrRemember = (toState.name === "login" || toState.name === "register" || toState.name === "remember");
        if(isLoginOrRegisterOrRemember) {
          //alert('wants to go to login');
          return; // no need to redirect 
        }
        // now, redirect only not authenticated
        var si = loginService.getSessionInfo();
        //alert('bin hier' + JSON.stringify(si));
        if(si.isAuthenticated === false) {
            //alert('redirect to login');
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        }
      });
  }]);

  login.directive("fileInput", fileInput);
  
  login.controller('rememberController', ['loginService', '$location', '$state', rememberController]);
  function rememberController(loginService, $location, $state) {
    var vm = this;
    vm.title = 'Erinnerung';
    vm.Email = 'peter@yahoo.com';
    vm.send = function() {
      //mailService.send(vm.email)
        //.then(function() {
          $state.go('login'); // go to login
        //});
    }
  }

})();