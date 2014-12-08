var viewEventsModule = angular.module('viewEventsModule', []);

viewEventsModule.controller('viewEventsCtrl', function($scope, Page, $http) {
    Page.setTitle('View Events');
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source, grabs events from the database */
    $scope.eventSources = [
        /*{
            events: function() {
                var eventdata = $http.get('/app/database/getEvents.php')
                    .success(function(eventdata) {
                        var eventCount = eventdata.length;
                        var source = [];
                        var jsonData = [];
                        for (var i = 0; i < eventCount; i++) {
                            var eventId = eventdata[i].event_id;
                            if (!source[i])
                                source[i] = [];
                            source[i] = '/app/database/getEvents.php?e=' + eventId;

                            jsonData.push({
                                url: source[i],
                                method: "GET",
                                error: function() { alert('There was an error loading calendar data.'); }
                            });
                        }
//                      var jsonData = data;
                        console.log(jsonData);
                        return jsonData;
                    });
            }
        }*/
    ];
    
    $scope.getEvents = function() {
        $scope.events = $http.get('/app/database/getEvents.php')
            .success(function(data) {
                var eventdata = data;
                return eventdata;
            });
        $scope.eventSources.push($scope.events);
        console.log($scope.eventSources);
    }
    $scope.getEvents();

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