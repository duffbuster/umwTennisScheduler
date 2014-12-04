var viewEventsModule = angular.module('viewEventsModule', []);

viewEventsModule.controller('viewEventsCtrl', function($scope, Page) {
    Page.setTitle('View Events');
    $scope.isLoginPage = false;
    
    $scope.eventSources = [
        {
            events: [
                {
                    title: 'Event1',
                    start: '2014-12-12'
                },
                {
                    title: 'Event2',
                    start: '2014-12-13'
                }
            ],
            color: 'yellow',
            textColor: 'black'
        }
    ];
});