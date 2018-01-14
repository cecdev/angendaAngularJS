(function() {
	'use strict';

	angular
		.module('cecContactApp')
		.factory('cecLoadLang', cecLoadLang);

	cecLoadLang.$inject = ['$http', '$localStorage', '$sessionStorage', '$window', "$rootScope"];

	/* @ngInject */
	function cecLoadLang($http, $localStorage, $sessionStorage, $window, $rootScope) {
		var parent = $rootScope;
		var vm     = this;
		
		vm.lang = undefined;
		
		return {
			get url() {
				return 'app/cec-contact/lang/'
			},
			load_translate: function(lang) {
				var parent = $rootScope;
				if($localStorage.lang != undefined){
					var idioma = $localStorage.lang;
				}else{
					var idioma         = lang;
					$localStorage.lang = lang;
				}


				return $http.get(this.url + idioma +'.json')
					.then(response => response.data)
					.then(translate => {
						vm.lang = angular.fromJson(translate);
						if (parent.lang == undefined) {
							parent.lang = vm.lang;
						}
						return translate;
					})
			}
		}
	}
})();