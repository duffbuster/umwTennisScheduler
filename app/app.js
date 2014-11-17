var app = angular.module('tennisCenterApp', [/*'ui.calendar', */'ui.bootstrap']);

app.controller('AlertCtrl', function($scope) {
        $scope.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things and try submitting again.' },
            { type: 'success', msg: 'Well done! You have successfully read this important alert message.' }
        ];
        
        $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Alert!'});
        };
    
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
});

/*function databaseController($scope, $http) {
    var site = "http://angular.mackeydev.com";
    var page = "/mackeyde_angularScheduler";
    $http.get(site + page).success(function(response) {
        $scope.title = response;
    });
    
}*/