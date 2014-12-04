var createEventModule = angular.module('createEventModule', []);

createEventModule.controller('createEventCtrl', function($scope, $http, Page, EventService) {
    Page.setTitle('Create Event');
    $scope.isLoginPage = false;
    
    $scope.eventInfo = EventService.newInfo();
    
    $scope.clear = function() {
        $scope.eventInfo = EventService.clear($scope.eventInfo);
    };
    
    $scope.submit = function() {
        EventService.submit($scope.eventInfo);
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
            event_start_time: info.startTime.getHours() + ":" + info.startTime.getMinutes() + ":00",
            event_end_time: info.endTime.getHours() + ":" + info.endTime.getMinutes() + ":00",
            event_start_date: info.startDate.getFullYear() + "-" + (info.startDate.getMonth()+1) + "-" + info.startDate.getDate(),
            event_end_date: info.endDate.getFullYear() + "-" + (info.endDate.getMonth()+1) + "-" + info.endDate.getDate(),
            event_all_day: info.allDay ? 1 : 0,
            event_recurring: info.isRepeating ? 1 : 0,
            event_created_by: Session.userId,
            event_created: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        console.log(eventInfo);
        return $http
            .post("/app/database/createEvent.php", eventInfo)
            .then(function(data) {
                var result = data;
                console.log(result);
            });
    };
    
    return eventService;
});