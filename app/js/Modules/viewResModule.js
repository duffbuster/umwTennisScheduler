var viewResModule = angular.module('viewResModule', []);

viewResModule.controller('viewResCtrl', function($scope, Page) {
    Page.setTitle('View Reservations');
    $scope.isLoginPage = false;
});