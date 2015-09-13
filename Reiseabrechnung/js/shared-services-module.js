(function() {

  'use strict';

  var sharedServices = angular.module('sharedServicesModule', ['ngResource']);
  //alert('sharedServicesModule');

  sharedServices.config(['$httpProvider', 
  function($httpProvider) { 
    //alert('sharedServices.config');
    $httpProvider.defaults.headers.common['X-ZUMO-APPLICATION'] = 'xRfyscevXIUfVryIibqVaLZQaiuIxb42'; 
    $httpProvider.defaults.headers.common['Content-Type'] = 'Application/json';    
  }]);

  sharedServices.factory('Person', ['$resource', function($resource) {
    //alert('Person');
    return $resource('https://reiseabrechnung.azure-mobile.net/tables/person/:id?:filter', {
      id: '@id',
      filter: '@filter'
    }, {
      'update': {
        method: 'PATCH'
      }
    });
  }]);

  sharedServices.factory('Project', ['$resource', function($resource) {
    return $resource('https://reiseabrechnung.azure-mobile.net/tables/project/:id?:filter', {
      id: '@id',
      filter: '@filter'
    }, {
      'update': {
        method: 'PATCH'
      }
    });
  }]);
  
  sharedServices.factory('PersonProject', ['$resource', 'Person', '$q', '$window',
    function($resource, Person, $q, $window) {

      function getPersonProjects(id) {
        var deferred = $q.defer();
        $resource('https://reiseabrechnung.azure-mobile.net/tables/project?$filter=OwnerId eq :id', {
          id: '@id'
        }, {
            'update': {
              method: 'PATCH'
            }
          }).query({
            id: id
          },
          function(resp) {
            deferred.resolve(resp);
          },
          function() { alert('eee');}
        );
        return deferred.promise;
      }

      function getProjectPeople(id) {
        var deferred = $q.defer();
        $resource('https://reiseabrechnung.azure-mobile.net/api/projpers?ProjectId=:id', {
          id: '@id'
        }, {
            'update': {
              method: 'PATCH'
            }
          }).query({
            id: id
          },
          function(resp) {
            deferred.resolve(resp);
          },
          function() { alert('eee');}
        );
        return deferred.promise;
      }

      function addProjectPerson(projectId, nick, personId) {
        var PP = $resource('https://reiseabrechnung.azure-mobile.net/tables/projectperson/:id?:filter', {
          id: '@id',
          filter: '@filter'
        }, {
          'update': {
            method: 'PATCH'
          }
        });
        var pp = new PP({
            ProjectId: projectId,
            Nick: nick,
            PersonId: personId
          });
        return pp.$save();
      }

      return {
        getPersonProjects: getPersonProjects,
        getProjectPeople: getProjectPeople,
        addProjectPerson: addProjectPerson
      }
    }
  ]);


})();
