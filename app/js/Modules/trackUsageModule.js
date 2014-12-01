var trackUsageModule = angular.module('trackUsageModule', []);

trackUsageModule.controller('trackUsageCtrl', function($scope, Page) {
    Page.setTitle('Track Usage');
    $scope.isLoginPage = false;
});