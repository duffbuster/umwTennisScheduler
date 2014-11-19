var tennisApp = angular.module('tennisCenterApp', [
    /*'ui.calendar', */
//    'ngRoute',
    'ui.bootstrap',
    'createEventControllers',
    'createResControllers',
    'trackRevenueControllers',
    'trackUsageControllers',
    'viewEventsControllers',
    'viewResControllers',
    'loginControllers', // need another controller for logout?
    'createUserControllers'
])/*.config(function(injectables) {
    // providers and constants
    // prevents accidental instantiation of services before they have been fully configured
}).run(function(injectables) {
    // instances and constants
    // prevents further system configuration during run time
})*/.controller('timeCtrl', function($scope, $log) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
}).controller('DatepickerCtrl', function($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
}).controller('databaseCtrl', function($scope, $http) {
    $scope.getEvents = function() {
        $http.get("/app/database/getEvents.php").success(function(data) {
            $scope.events = data;
        });
    };
});