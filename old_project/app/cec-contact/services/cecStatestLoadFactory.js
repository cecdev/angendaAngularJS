(function() {
	'use strict';

	angular
		.module('cecContactApp')
		.factory('cecStatestLoadFactory', cecStatestLoadFactory);

	cecStatestLoadFactory.$inject = ['$localStorage', '$sessionStorage', '$window', '$http'];

	/* @ngInject */
	function cecStatestLoadFactory($localStorage, $sessionStorage, $window, $http) {
		return {
			get url() {
				return 'app/cec-contact/data/states.json'
			},
			getAll: function() {
				return $http.get(this.url)
					.then(response => response.data)
					.then(list => {
						$localStorage.listStates = list.listStates;
						return list.listStates;
					});
			}
		}
	}
})();