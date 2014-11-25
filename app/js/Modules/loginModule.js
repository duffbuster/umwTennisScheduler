var loginModule = angular.module('loginModule', []);

loginModule
.controller('loginCtrl', function($scope, $rootScope, AUTH_EVENTS, AuthService, Page, Session) {
    Page.setTitle('Login');
    $scope.credentials = {
        username: '',
        password: ''
    };
    
    $scope.login = function(credentials) {
        AuthService.login(credentials).then(function(user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            // should be user in params
            console.log(user);
            $scope.setCurrentUser("poo");
        }, function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
    $scope.logout = function() {
        Session.destroy();
    }
})
.factory('AuthService', function($http, Session) {
    var authService = {};
    
    authService.login = function (credentials) {
        return $http
          .post("/app/database/login.php", credentials)
          .then(function (res) { // should it be just res.id? need to restructure data
            Session.create(res.data.user_id,
                           res.data.user_role);
            return res.data;
          });
    };
    
    authService.isAuthenticated = function () {
        return !!Session.userId;
    };
    
    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
    };
    
    return authService;

})
.service('Session', function() {
    this.create = function(/*sessionId, */userId, userRole) {
//        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
    };
    
    this.destroy = function () {
//        this.id = null;
        this.userId = null;
        this.userRole = null;
    };
    return this;
    
})
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    intern: 'intern',
    guest: 'guest'
});