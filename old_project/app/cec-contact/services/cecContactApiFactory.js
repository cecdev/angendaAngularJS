(function() {
	'use strict';

	angular
		.module('cecContactApp')
		.factory('cecContactApiFactory', cecContactApiFactory);

	cecContactApiFactory.$inject = ['$localStorage', '$sessionStorage', '$window'];

	/* @ngInject */
	function cecContactApiFactory($localStorage, $sessionStorage, $window) {
		var service = {
			listContact: function() {
				var list = [];
				if ($localStorage.listContact != undefined && $localStorage.listContact != 0) {
					list = $localStorage.listContact;
				}
				this.list = list;
				return list;
			}
		};
		return service;
	}
})();