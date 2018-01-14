(function() {
	'use strict';

	angular
		.module('cecContactApp')
		.factory('cecContactLoadFactory', cecContactLoadFactory);

	cecContactLoadFactory.$inject = ['$localStorage', '$sessionStorage', '$window', '$http'];

	/* @ngInject */
	function cecContactLoadFactory($localStorage, $sessionStorage, $window, $http) {
		return {
			get url() {
				return 'app/cec-contact/data/register.json'
			},
			getAll: function() {
				return $http.get(this.url)
					.then(response => response.data)
					.then(list => {
						$localStorage.listContact = list.listContact;
						return list.listContact;
					});
			}
		}
	}
})();