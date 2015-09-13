(function() {

  'use strict';

  var app = angular.module('appModule', 
  ['ui.router', 'loginModule', 'sharedServicesModule', 'ngAnimate']);
  //alert('appModule');
/*
  app.run(['$rootScope', '$location',
    function($rootScope, $location) {
      alert('login.run');
      $rootScope.$on('$routeChangeStart', function(userInfo) {
        alert('routeChangeStart handled by rootScope');
      });
      $rootScope.$on('$routeChangeSuccess', function(userInfo) {
        alert('routeChangeSuccess handled by rootScope');
      });
      $rootScope.$on('routeChangeError',
        function(event, current, previous, eventObj) {
          alert('routeChangeError handled by rootScope');
          if (!eventObj.isAuthenticated === false) {
            alert('go to login');
            $location.path('login');
          }
        });
    }
  ]);
*/  

  app.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home.html'
/*
        resolve: {
          auth: ['$q', 'loginService',
          function($q, loginService) {
            alert('try to go home');
            var si = loginService.getSessionInfo();
            if (si.isAuthenticated) {
              alert('ja: user is authenticated: ' + si.name);
              return $q.when(si);
            }
            else {
              alert('no: user in not authenitcated');
              $rootScope.$broadcast('routeChangeError');
              return $q.reject({ authenticated: true });
            }
          }]
        }
*/
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'register.html'
      })
      .state('remember', {
        url: '/remember',
        templateUrl: 'remember.html'
      })
      .state('test', {
        url: '/test',
        templateUrl: 'test.html'
      })
      .state('project', {
        url: '/project/:ProjectId',
        templateUrl: 'project.html'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'dummy-logout.html'
      })
      .state('newProject', {
        url: '/newProject',
        templateUrl: 'new-project.html'
      })
      .state('newPerson', {
        url: '/newPerson/:ProjectId',
        templateUrl: 'new-person.html'
      });
  }]);
  
/*
  app.config(['$routeProvider', 
  function($routeProvider) {
    //alert('app.config');
    $routeProvider
      .when('/', {
        templateUrl: 'login.html'
      })
      .when('/home', {
        templateUrl: 'home.html'
      })
      .when('/test', {
        templateUrl: 'test.html'
      })
      .when('/login', {
        templateUrl: 'login.html'
      })
      .when('/register', {
        templateUrl: 'register.html'
      })
      .when('/project/:id', {
        templateUrl: 'project.html'
      });
  }]);

  app.config(['$routeProvider', 
  function($routeProvider) {
    alert('app.config');
    $routeProvider
      .when('/', {
        templateUrl: 'login.html'
      })
      .when('/home', {
        templateUrl: 'home.html',
        resolve: {
          auth: ['$q', 'loginService',
          function($q, loginService) {
            alert('resolve');
            var si = loginService.getSessionInfo();
            if (si.isAuthenticated) {
              return $q.when(si);
            }
            else {
              return $q.reject({ authenticated: true });
            }
          }]
        }
      })
      .when('/test', {
        templateUrl: 'test.html'
      })
      .when('/login', {
        templateUrl: 'login.html'
      })
      .when('/register', {
        templateUrl: 'register.html'
      })
      .when('/project/:id', {
        templateUrl: 'project.html'
      });
  }]);
*/
})();