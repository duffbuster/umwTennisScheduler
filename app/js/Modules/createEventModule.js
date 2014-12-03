var createEventModule = angular.module('createEventModule', []);

createEventModule.controller('createEventCtrl', function($scope, $http, Page, EventService) {
    Page.setTitle('Create Event');
    $scope.isLoginPage = false;
    
    $scope.info = EventService.newInfo();
    
    $scope.clear = function() {
        $scope.info = EventService.clear($scope.info);
    };
    
    $scope.submit = function() {
        EventService.submit($scope.info);
    };
})

.factory('EventService', function($http, Session) {
    var eventService = {};
    
    eventService.newInfo = function() {
        var eventInfo = {
            name: null,
            startDate: new Date(),
            endDate: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            allDay: false,
            isRepeating: false
        };
        return eventInfo;
    };
    
    eventService.clear = function(info) {
        info.name = "";
        info.startDate = new Date();
        info.startTime = new Date();
        info.endDate = new Date();
        info.endtime = new Date();
        info.allDay = false;
        info.isRepeating = false;
        return info;
    };
    
    eventService.submit = function(info) {
        var eventInfo = {
            event_sort_name: info.name.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s/g, "_"),
            event_name: info.name.trim(),
            event_start_time: info.startTime.toLocaleTimeString, //format
            event_end_time: info.endTime.toLocaleTimeString, // format
            event_start_date: info.startDate.toString(), // format
            event_end_date: info.endDate.toString(), // format
            event_all_day: info.allDay ? 1 : 0,
            event_recurring: info.isRepeating ? 1 : 0,
            event_created_by: Session.userId,
            event_created: new Date().toJSON()
        };
        console.log(eventInfo);
        /*return $http
            .post("/app/database/createEvent.php", eventInfo)
            .success(function(data) {
                var result = data;
                return result;
            });*/
    };
    
    return eventService;
});