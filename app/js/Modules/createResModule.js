var createResModule = angular.module('createResModule', []);

var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;;

createResModule.controller('createResCtrl', function($scope, Page) {
    Page.setTitle('Create Reservation');
    $scope.isLoginPage = false;
    $scope.courts = [
        'Indoor 1',
        'Indoor 2',
        'Indoor 3',
        'Indoor 4',
        'Indoor 5',
        'Indoor 6',
        'Outdoor 1',
        'Outdoor 2',
        'Outdoor 3',
        'Outdoor 4',
        'Outdoor 5',
        'Outdoor 6',
        'Outdoor 7',
        'Outdoor 8',
        'Outdoor 9',
        'Outdoor 10',
        'Outdoor 11',
        'Outdoor 12'
    ];
});