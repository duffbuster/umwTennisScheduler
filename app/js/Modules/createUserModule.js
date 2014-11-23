var createUserModule = angular.module('createUserModule', []);

createUserModule.controller('createUserCtrl', function($scope, Page) {
    Page.setTitle('Create User');
});