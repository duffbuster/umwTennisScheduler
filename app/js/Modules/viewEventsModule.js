var viewEventsModule = angular.module('viewEventsModule', []);

viewEventsModule.controller('viewEventsCtrl', function($scope, Page) {
    Page.setTitle('View Events');
    $scope.isLoginPage = false;
});