var createResModule = angular.module('createResModule', []);

createResModule.controller('createResCtrl', function($scope, Page) {
    Page.setTitle('Create Reservation');
    $scope.isLoginPage = false;
});
