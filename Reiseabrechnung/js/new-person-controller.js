(function(app) {
  
  'use strict';

  app.controller('newPersonController', 
  ['$state', 'PersonProject', '$stateParams', newPersonController]);
  
  function newPersonController($state, PersonProject, $stateParams) {
    var vm = this;
    vm.title = 'Neuer Teilnehmer';
    vm.nick = '';
    vm.email = '';
    vm.errorMessage = '';
    var projectId = $stateParams.ProjectId;

    vm.cancel = function() {
      $state.go('project', { ProjectId: projectId }); 
    }
    
    vm.save = function() {
      PersonProject.addProjectPerson(projectId, vm.nick, null)
      .then(function() {
        $state.go('project', { ProjectId: projectId });
      }, function() {
        vm.errorMessage = 'Unerwarteter Fehler';
        $('#errorMessage').show();
        setTimeout(function() { $('#errorMessage').hide(500) }, 2000);
      });
    }
    
    vm.register = function() {
      $state.go('register'); // go to register
    }
  }
  
})(angular.module('appModule'));  