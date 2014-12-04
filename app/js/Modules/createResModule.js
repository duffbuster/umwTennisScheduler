var createResModule = angular.module('createResModule', []);

var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

createResModule.controller('createResCtrl', function($scope, Page, ReservationService) {
    Page.setTitle('Create Reservation');
    $scope.isLoginPage = false;
    
    $scope.resInfo = ReservationService.newInfo();
    
    $scope.clear = function() {
        $scope.resInfo = ReservationService.clear($scope.resInfo);
    };
    
    $scope.submit = function() {
        ReservationService.submit($scope.resInfo);
    };
    
    $scope.courts = [
        { name: 'Indoor 1', sortName: 'indoor_1' },
        { name: 'Indoor 2', sortName: 'indoor_2' },
        { name: 'Indoor 3', sortName: 'indoor_3' },
        { name: 'Indoor 4', sortName: 'indoor_4' },
        { name: 'Indoor 5', sortName: 'indoor_5' },
        { name: 'Indoor 6', sortName: 'indoor_6' },
        { name: 'Outdoor 1', sortName: 'outdoor_1' },
        { name: 'Outdoor 2', sortName: 'outdoor_2' },
        { name: 'Outdoor 3', sortName: 'outdoor_3' },
        { name: 'Outdoor 4', sortName: 'outdoor_4' },
        { name: 'Outdoor 5', sortName: 'outdoor_5' },
        { name: 'Outdoor 6', sortName: 'outdoor_6' },
        { name: 'Outdoor 7', sortName: 'outdoor_7' },
        { name: 'Outdoor 8', sortName: 'outdoor_8' },
        { name: 'Outdoor 9', sortName: 'outdoor_9' },
        { name: 'Outdoor 10', sortName: 'outdoor_10' },
        { name: 'Outdoor 11', sortName: 'outdoor_11' },
        { name: 'Outdoor 12', sortName: 'outdoor_12' },
    ];
        
    $scope.types = [
        { name: 'Student', sortName: 'student' },
        { name: 'Club Team', sortName: 'club_team' },
        { name: 'Varsity', sortName: 'varsity' },
        { name: 'PE Class', sortName: 'pe_class' },
        { name: 'Fac/Staff', sortName: 'fac_staff' },
        { name: 'Community', sortName: 'community' },
        { name: 'Lesson', sortName: 'lesson' },
        { name: 'Clinics/Camps', sortName: 'clinics_camps' },
        { name: 'Tournament', sortName: 'tournament' }
    ];
})

.factory('ReservationService', function($http, Session) {
    var reservationService = {};
    
    reservationService.newInfo = function() {
        var resInfo = {
            name: null,
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            phone: null,
            email: '',
            numPlayers: null,
            court: null,
            playerType: null
        };
        return resInfo;
    };
    
    reservationService.clear = function(info) {
        info.name = '';
        info.date = new Date();
        info.startTime = new Date();
        info.endTime = new Date();
        info.phone = '';
        info.email = '';
        info.numPlayers = 0;
        info.court = '';
        info.playerType = '';
        return info;
    };
    
    reservationService.submit = function(info) {
        var resInfo = {
            res_sort_name: info.name.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s/g, "_"),
            res_name: info.name.trim(),
            res_date: info.date.getFullYear() + "-" + (info.date.getMonth()+1) + "-" + info.date.getDate(),
            res_start_time: info.startTime.getHours() + ":" + info.startTime.getMinutes() + ":00",
            res_end_time: info.endTime.getHours() + ":" + info.endTime.getMinutes() + ":00",
            res_phone: info.phone.trim().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s/g, ""),
            res_email: info.email.trim(),
            res_num_players: info.numPlayers,
            res_court: info.court.sortName,
            res_player_type: info.playerType.sortName,
            res_created_by: Session.userId,
            res_created: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        console.log(resInfo);
        
        /*return $http
            .post("/app/database/createReservation.php", resInfo)
            .then(function(data) {
                var result = data;
                console.log(result);
            });*/
    };
    
    return reservationService;
    
});