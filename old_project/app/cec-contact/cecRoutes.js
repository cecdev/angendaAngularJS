angular.module('cecContactApp')
	.config(['$routeProvider', function($routeProvider){
	    $routeProvider
	        .when('/index.html', {
	            templateUrl: 'app/cec-contact/modules/index/views/index.html',
	            controller: 'cecIndexController as vmIndex'
	        })
	        .otherwise({
	            redirectTo: '/index.html'
	        })
	}]);
