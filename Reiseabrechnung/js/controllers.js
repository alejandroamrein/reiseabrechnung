(function() {

  var app = angular.module('appModule');

  app.controller('indexController', [indexController]);
  function indexController() {
    var vm = this;
    vm.title = 'Reiseabrechnung - Index';
  }

  app.controller('testController', ['loginService', 'Person', testController]);
  function testController(loginService, Person) {
    
    var vm = this;
    vm.title = 'Reiseabrechnung - ';
    vm.people = Person.query(); 
    
    if (loginService) {
      var si = loginService.getSessionInfo();  
      vm.title += si.Name;
    }
    
    vm.newPerson = new Person();
    vm.newPerson.Name = 'hans@yahoo.com';
    vm.newPerson.Email = '12345';
    vm.newPerson.Password = '';
    
    vm.refresh = function() {        
      vm.people = Person.query();            
    }     
    
    vm.createPerson = function() {        
      vm.newPerson.$save(function() {            
        vm.people = Person.query();            
        vm.newPerson = new Person();        
        
      });    
    }     
    
    vm.deletePerson = function(person) {        
      person.$delete(function() {            
        vm.people = Person.query();        
      });    
    }   
    
    vm.updatePerson = function(person) {        
      person.$update();    
    }

  }

})();
