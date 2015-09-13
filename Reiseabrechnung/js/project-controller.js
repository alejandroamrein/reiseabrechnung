(function(app) {

  app.controller('projectController', 
  ['loginService', 'PersonProject', '$state', '$stateParams', projectController]);
  function projectController(loginService, PersonProject, $state, $stateParams) {
    var vm = this;
    vm.title = 'Projekt-Details';
    vm.items = [];
    var projectId = $stateParams.ProjectId;
    PersonProject.getProjectPeople(projectId)
      .then(function(resp) {
        var items = resp;        
        vm.items = items;
      }, 
      function() { 
        alert('err'); 
      });
    vm.goHome = function() {
      $state.go('home');
    }
    vm.addPerson = function() {
      $state.go('newPerson', { ProjectId: projectId });
    }
  }

})(angular.module('appModule'));