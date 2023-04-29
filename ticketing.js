var ticketingSystem = angular.module('ticketingSystem', []);

ticketingSystem.service('TicketService', function() {
  var tickets = [];

  // Generate a new ticket
  this.generateTicket = function(car) {
    var ticket = {
      id: tickets.length + 1,
      car: car,
      parkedAt: new Date()
    };
    tickets.push(ticket);
    return ticket;
  };

  // Get all tickets
  this.getAllTickets = function() {
    return tickets;
  };

  // Get a ticket by ID
  this.getTicketById = function(id) {
    for (var i = 0; i < tickets.length; i++) {
      if (tickets[i].id === id) {
        return tickets[i];
      }
    }
    return null;
  };

  // Remove a ticket by ID
  this.removeTicketById = function(id) {
    for (var i = 0; i < tickets.length; i++) {
      if (tickets[i].id === id) {
        tickets.splice(i, 1);
        return true;
      }
    }
    return false;
  };
});

ticketingSystem.controller('TicketController', function($scope, TicketService) {
  $scope.formData = {
    carMake: '',
    carModel: '',
    carColor: ''
  };

  // Define the submit function
  $scope.submit = function() {
    // Generate a new ticket and clear the form data
    var ticket = TicketService.generateTicket($scope.formData);
    $scope.formData = {
      carMake: '',
      carModel: '',
      carColor: ''
    };
  };

  // Get all tickets and assign to scope variable
  $scope.tickets = TicketService.getAllTickets();

  // Define the remove function
  $scope.removeTicket = function(id) {
    TicketService.removeTicketById(id);
    $scope.tickets = TicketService.getAllTickets();
  };
});