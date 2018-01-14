(function() {
	'use strict';

	angular
		.module('cecContactApp')
		.controller('cecIndexController', cecIndexController);

	cecIndexController.$inject = ['$rootScope'];

	/* @ngInject */
	function cecIndexController($rootScope) {
		var parent = $rootScope;
		var vm     = this;
		
		/* INCLUDES */
		vm.pathSections = 'app/cec-contact/modules/index/views/sections/';
		vm.sections     = {};
		
		vm.sections.TABELA_CONTATOS       = vm.pathSections+"cecSectionTableContacts.html";
		vm.sections.PAINEL_INFO           = vm.pathSections+"cecSectionInfoPanel.html";
		vm.sections.PAINEL_NOVO_CONTATO   = vm.pathSections+"ceSectionNewContact.html";
		vm.sections.PAINEL_EDITAR_CONTATO = vm.pathSections+"cecSectionEditContact.html";

	}
})();
