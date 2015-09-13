(function(app) {
  
  'use strict';

  app.controller('newProjectController', 
  ['loginService', '$state', 'PersonProject', newProjectController]);
  
  function newProjectController(loginService, $state, PersonProject) {
    var vm = this;
    vm.title = 'Neues Projekt';
    var si = loginService.getSessionInfo();
    vm.project = {
      OwnerId: si.Id,
      Title: '',
      Description: 'blah blah'
    };
    vm.errorMessage = '';

    vm.cancel = function() {
      $state.go('home'); 
    }
    
    vm.save = function() {
      // Projekt hinzufügen
      PersonProject.addProjectPerson(projectId, vm.nick, null)
      .then(function() {
        $state.go('project', { ProjectId: projectId });
      }, function() {
        vm.errorMessage = 'Unerwarteter Fehler';
        $('#errorMessage').show();
        setTimeout(function() { $('#errorMessage').hide(500) }, 2000);
      });
    }
  }
  
})(angular.module('appModule'));  