(function() {

  'use strict';

  var login = angular.module('loginModule');
  
  login.controller('loginController', ['loginService', '$location', '$state', loginController]);
  function loginController(loginService, $location, $state) {

    var vm = this;
    vm.title = 'Anmeldung';
    vm.errorMessage = '';
    vm.Email = 'peter@hotmail.com';
    vm.Password = '123';
    vm.login = function() {
      loginService.login(vm.Email, vm.Password)
        .then(function(result) {
          var si = loginService.getSessionInfo();
          //alert(JSON.stringify(si));
          if (si.isAuthenticated) {
            $state.go('home'); // go to home
          }
          else {
            vm.errorMessage = 'Falsche Eingaben';
            $('#errorMessage').show();
            setTimeout(function() { $('#errorMessage').hide(500) }, 2000);
          }
        },
        function() {
            vm.errorMessage = 'Unerwarteter Fehler';
            $('#errorMessage').show();
            setTimeout(function() { $('#errorMessage').hide(500) }, 2000);
        });
    }
    vm.register = function() {
      $state.go('register'); // go to register
    }
    vm.remember = function() {
      $state.go('remember'); // go to remember
    }
  }
  
})();