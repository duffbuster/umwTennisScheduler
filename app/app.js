var tennisApp = angular.module('tennisCenterApp', [
    'ui.calendar', 
    'loginModule',
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'createEventModule',
    'createResModule',
    'trackRevenueModule',
    'trackUsageModule',
    'viewEventsModule',
    'viewResModule',
    'createUserModule'
]);

tennisApp
// Configures the routes
.config(function($routeProvider, USER_ROLES) {

    $routeProvider
    .when('/', {
        templateUrl: '/views/main.html',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.all, USER_ROLES.guest, USER_ROLES.intern]
        }
    })
    .when('/cevent', {
        templateUrl: '/views/createEvent.html',
        controller: 'createEventCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    })
    .when('/cres', {
        templateUrl: '/views/createRes.html',
        controller: 'createResCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.intern]
        }
    })
    .when('/trev', {
        templateUrl: '/views/trackRevenue.html',
        controller: 'trackRevenueCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    })
    .when('/tuse', {
        templateUrl: '/views/trackUsage.html',
        controller: 'trackUsageCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    })
    .when('/vevents', {
        templateUrl: '/views/viewEvents.html',
        controller: 'viewEventsCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.intern]
        }
    })
    .when('/vres', {
        templateUrl: '/views/viewRes.html',
        controller: 'viewResCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.intern]
        }
    })
    .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'loginCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.all, USER_ROLES.guest, USER_ROLES.intern]
        }
    })
    .otherwise({
        redirectTo: '/'
    });

})
// Creates a new page name object
.factory('Page', function() {
    var title = "Home";
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
    };
})
// Controls the title bar of the page
.controller('titleCtrl', function($scope, Page) {
    $scope.Page = Page;
})
// Controls the active element on the navbar
.controller('activeController', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
})
// Application controller
.controller('applicationCtrl', function($scope, cookieService, USER_ROLES, AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
    $scope.isLoginPage = false;
 
    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
        cookieService.setUser($scope.currentUser);
    };
})
// Store user info in browser cookies
// works, but doesn't keep data after refresh
.service('cookieService', function($cookieStore) {
    var cookieService = {};
    cookieService.user = null;
    cookieService.setUser = function(newUser) {
        console.log("setting cookies");
        cookieService.user = newUser;
        if (cookieService.user === null) $cookieStore.remove('user');
        else $cookieStore.put('user', cookieService.user);
    };
    cookieService.destroy = function() {
        console.log("destroying cookies");
        if (cookieService.user === null) console.error("There is no god...");
        else $cookieStore.remove('user');
    };
    return cookieService;
})
// does some fancy http stuff
.config(function ($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
    ]);
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function (response) { 
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout
            }[response.status], response);
            return $q.reject(response);
        }
  };
})
// Runs user authentication Comment out until I can actually log in
.run(function($rootScope, AUTH_EVENTS, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
        // cannot read property 'authorizedRoles' of undefined
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) { 
            event.preventDefault();
            if (AuthService.isAuthenticated()) {
                // user is not allowed
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                // user is not logged in
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }
    });
})
// redirects to the login form
.directive('loginDialog', function(AUTH_EVENTS) {
    return {
        restrict: 'A',
        template: '<div ng-if="visible" ng-include="\'/views/login.html\'">',
        link: function (scope) {
              var showDialog = function () {
                    scope.visible = true;
              };

              scope.visible = false; // not setting this correctly
              scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
              scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
        }
    };
})

.directive('formAutofillFix', function ($timeout) {
    return function (scope, element, attrs) {
    element.prop('method', 'post');
    if (attrs.ngSubmit) {
      $timeout(function () {
        element
          .unbind('submit')
          .bind('submit', function (event) {
            event.preventDefault();
            element
              .find('input, textarea, select')
              .trigger('input')
              .trigger('change')
              .trigger('keydown');
            scope.$apply(attrs.ngSubmit);
          });
      });
    }
  };
})
.controller('DatepickerCtrl', function($scope) {
    
    $scope.startOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.startOpened = true;
    };
    
    $scope.endOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.endOpened = true;
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
    
    $scope.getReservations = function() {
        $http.get("/app/database/getReservations.php").success(function(data) {
            $scope.reservations = data;
        });
    }
});
