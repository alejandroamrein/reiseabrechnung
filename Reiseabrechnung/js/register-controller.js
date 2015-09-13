(function() {
  'use strict';

  var login = angular.module('loginModule');

  login.controller('registerController', 
  ['$state', 'loginService', '$scope', registerController]);
  
  function registerController($state, loginService, $scope) {
    //var vm = this;
    $scope.title = 'Registrierung';
    $scope.person = {
      Email: 'hans@yahoo.com',
      Name: 'Hans',
      Password: '123',
      Photo: "data:image/png;base64,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"
    };
    $scope.PasswordConfirmation = '123';

    $scope.cancel = function() {
      $state.go('login'); // go to login
    }
    
    $scope.save = function() {
      loginService.register($scope.person);
      $state.go('home'); // go to home
    }
    
    $scope.setImageSrc = function(src) {
      //alert(src);
      $scope.$apply(function () {
        $scope.person.Photo = src;
      });
    }
    
    $scope.readFile = function () {  
      var reader = new FileReader(); 
      reader.onloadend = function () {
        var src = reader.result;
        $scope.setImageSrc(src);
      }
      reader.readAsDataURL($scope.file);
    }
  }
  
})();  