var viewEventsModule = angular.module('viewEventsModule', []);

viewEventsModule.controller('viewEventsCtrl', function($scope, Page, $http) {
    Page.setTitle('View Events');
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */
    $scope.eventSources = [
        {
            events: function() {
                var data = $http({
                    url: "/app/database/getEvents.php",
                    method: "GET"
                }).success(function(data) {
                    var eventCount = data.lenght();
                    var source = [];
                    var jsonData = [];
                    for (var i = 0; i < eventCount; i++) {
                        var eventId = data[i].event_id;
                        if (!source[i])
                            source[i] = [];
                        source[i] = '/app/database/getEvents.php?e=' + eventId;
                        
                        jsonData.push({
                            url: source[i],
                            method: "GET",
                            error: function() { alert('There was an error loading calendar data.'); }
                        });
                    }
                    console.log(jsonData);
                    return jsonData;
                });
            }
        }
    ];
    console.log($scope.eventSources);
    
    // Will eventually need something to delete an event
    
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 500,
        editable: false,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick, //have this open a pre or something with the info (directive)
        eventRender: $scope.eventRender
      }
    };
});