(function () {
	'use strict';

	angular
		.module('cecContactApp')
		.controller('cecMainController', cecMainController);

	cecMainController.$inject = ['$rootScope', '$location', '$timeout'];

	/* @ngInject */
	function cecMainController($rootScope, $location, $timeout) {
		var parent = $rootScope;
		var vm     = this;

		parent.base_url         = $location.$$protocol + '://' + $location.$$host;
		parent.recordNameDelete = undefined;

		vm.titleProject    = "Desenvolvido por Claudio Alexssandro Lino"
		vm.titleProjectBar = vm.titleProject;


		parent.closeModal = function () {
			$('.modal').modal('hide');
		}

		$timeout(function () {
			vm.titleProject    = parent.lang.HEADER_TITULO_PROJETO;
			vm.titleProjectBar = parent.lang.TITULO_PROJETO;

		}, 2000);

	}
})();