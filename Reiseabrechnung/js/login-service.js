(function(login) {

  'use strict';

  login.factory('loginService', ['Person', '$q', '$window',
    function(Person, $q, $window) {
      //alert('loginService');

      var sessionInfo = {
        Id: 0,
        Email: "",
        Name: "",
        isAuthenticated: false,
        Photo: ""
      };

      function init() {
        if ($window.sessionStorage["sessionInfo"]) {
          sessionInfo = JSON.parse($window.sessionStorage["sessionInfo"]);
        }
      }
      init();

      function login(Email, Password) {
        //alert('login');
        //alert("(email eq '" + email + "' and password eq '" + password + "')");
        logout();
        var deferred = $q.defer();
        Person.query({
            //email: email,
            //password: password
            filter: "$filter=email eq '" + Email + "' and password eq '" + Password + "'"
          },
          function(resp) {
            //alert(resp.length);
            if (resp.length == 1) {
              sessionInfo = {
                Id: resp[0].Id,
                Name: resp[0].Name,
                Email: resp[0].Email,
                isAuthenticated: true,
                Photo: resp[0].Photo
              };
              $window.sessionStorage["sessionInfo"] = JSON.stringify(sessionInfo);
              //alert($window.sessionStorage["sessionInfo"]);
            }
            deferred.resolve();
          }
        );
        return deferred.promise;
      }

      function logout() {
        sessionInfo = {
          Id: 0,
          Email: "",
          Name: "",
          isAuthenticated: false,
          Photo: ""
        };
        $window.sessionStorage["sessionInfo"] = JSON.stringify(sessionInfo);
      }

      function register(personData) {
        var person = new Person(personData);
        person.$save();
      }

      return {
        login: login,
        logout: logout,
        getSessionInfo: function() {
          return sessionInfo;
        },
        register: register
      }
    }
  ]);

})(angular.module('loginModule'));