var createEventModule = angular.module('createEventModule', []);

createEventModule.factory('event', function() {
    
}).controller('createEventCtrl', function($scope, $http, Page) {
    // TODO: create factories/services for this module
    Page.setTitle('Create Event');
    $scope.isLoginPage = false;
    
    $scope.info = {
        name: null,
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        allDay: false,
        isRepeating: false
    };
    
    $scope.clear = function() {
        $scope.info.name = "";
        $scope.info.startDate = new Date();
        $scope.info.startTime = new Date();
        $scope.info.endDate = new Date();
        $scope.info.endtime = new Date();
        $scope.info.allDay = false;
        $scope.info.isRepeating = false;
    };
    
    $scope.submit = function() {
        $scope.eventInfo = {
            event_sort_name: $scope.info.name.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s/g, "_"),
            event_name: $scope.info.name.trim(),
            event_start_time: $scope.info.startTime.toLocaleTimeString,
            event_end_time: $scope.info.endTime.toLocaleTimeString,
            event_start_date: $scope.info.startDate.toString(),
            event_end_date: $scope.info.endDate.toString(),
            event_all_day: $scope.info.allDay ? 1 : 0,
            event_recurring: $scope.info.isRepeating ? 1 : 0,
            event_created: new Date().toJSON()
            // TODO: capture user and push event_created_by
        };
        /*$http.get("/app/database/createEvent.php?eventInfo="+$scope.eventInfo).success(function(data) {
            $scope.result = data;
        });*/
    };
});