(function () {
	'use strict';

	angular
		.module('cecContactApp')
		.controller('cecIndexActionPanelController', cecIndexActionPanelController);

	cecIndexActionPanelController.$inject = ['cecContactLoadFactory', 'cecStatestLoadFactory', '$rootScope', '$localStorage', '$sessionStorage', '$window', 'notificationService'];

	/* @ngInject */
	function cecIndexActionPanelController(cecContactLoadFactory, cecStatestLoadFactory, $rootScope, $localStorage, $sessionStorage, $window, notificationService) {
		var parent = $rootScope;
		var vm = this;

		// *** FUNÇOES
		var _reset = function () {
			jQuery('.all_fields').val(null);

			vm.newRecord      = {name: undefined,email: undefined,tate: undefined};
			vm.editRecord     = {index_reg: undefined,name: undefined,email: undefined,state: undefined};
			vm.listContact    = [{name: undefined,email: undefined,state: undefined}];
			vm.editIndexReg   = undefined;
			vm.deleteIndexReg = undefined;

			parent.activePanelInfo        = true;
			parent.activePanelNewContact  = false;
			parent.activePanelEditContact = false;
		}

		vm.returnPanel = function () {
			_reset();
		}

		/* PAINEL ADICIONAR REGISTRO */
		vm.showAddRecord = function () {
			parent.activePanelInfo        = false;
			parent.activePanelNewContact  = true;
			parent.activePanelEditContact = false;
		}

		vm.addRecord = function (newRecord) {
			if (newRecord.name != undefined && newRecord.email != undefined && newRecord.state != undefined) {
				if (parent.listContact[0].name == undefined) {

					parent.listContact[0].name  = newRecord.name;
					parent.listContact[0].email = newRecord.email;
					parent.listContact[0].state = newRecord.state;

				} else {
					parent.listContact.push(angular.copy(newRecord));
				}

				if (parent.listContact.length > 0) {
					$localStorage.listContact = parent.listContact;
					notificationService.success(parent.lang.PAINEL_ADICIONAR_NOVO_CONTATO_NOTIFICA_SUCESSO_TEXTO);
				} else {
					notificationService.error(parent.lang.PAINEL_ADICIONAR_NOVO_CONTATO_NOTIFICA_ERRO_TEXTO);
				}

				_reset();
			} else {
				notificationService.error(parent.lang.PAINEL_ADICIONAR_NOVO_CONTATO_NOTIFICA_ERRO_PREENCHER_TEXTO);
			}
		}
		
		/* PAINEL EDITAR REGISTRO */
		parent.showEditRecord = function (index_record) {

			vm.editIndexReg = index_record;
			vm.editRecord = {
				name  : parent.listContact[index_record].name,
				email : parent.listContact[index_record].email,
				state : parent.listContact[index_record].state
			};
			parent.activePanelInfo        = false;
			parent.activePanelNewContact  = false;
			parent.activePanelEditContact = true;
		}

		vm.alterRecord = function (data_reg, index_reg) {

			if (data_reg.name.length > 0 && data_reg.email.length > 0 && data_reg.state.length > 0) {

				parent.listContact[index_reg] = {
					name  : data_reg.name,
					email : data_reg.email,
					state : data_reg.state
				};

				$localStorage.listContact = parent.listContact;
				notificationService.success(parent.lang.PAINEL_EDITAR_CONTATO_NOTIFICA_SUCESSO_TEXTO);
				_reset();
			} else {
				notificationService.error(parent.lang.PAINEL_EDITAR_CONTATO_NOTIFICA_ERRO_TEXTO);
			}

		}
		/* AÇÃO DELETAR REGISTRO */
		parent.deleteRecord = function (trash_contact) {
			vm.deleteIndexReg       = trash_contact;
			parent.recordNameDelete = parent.listContact[vm.deleteIndexReg].name
			$('#modalDeleteRecord').modal('show');

		}

		parent.confirmDeleteRecord = function () {
			parent.listContact.splice(vm.deleteIndexReg, 1)
			$localStorage.listContact = parent.listContact;
			notificationService.success(parent.lang.TABELA_CONTATOS_NOTIFICA_DELETE_SUCESSO);
			_reset();
			$('#modalDeleteRecord').modal('hide');
		}

		/* Carregamento dos contatos de exemplo */

		vm.loadListContact = function () {
			cecContactLoadFactory.getAll()
				.then(list => {

					if (list.length > 0) {

						parent.listContact = list;
						notificationService.notify({
							title        : parent.lang.PAINEL_ADICIONAR_CONTATO_NOTIFICA_SUCESSO_TITULO,
							title_escape : false,
							text         : parent.lang.PAINEL_ADICIONAR_CONTATO_NOTIFICA_SUCESSO_TEXTO,
							text_escape  : false,
							type         : "success",
							icon         : 'fa fa-smile-o fa-2x'
						});
					} else {
						notificationService.notify({
							title        : parent.lang.PAINEL_ADICIONAR_CONTATO_NOTIFICA_ERRO_TITULO,
							title_escape : false,
							text         : parent.lang.PAINEL_ADICIONAR_CONTATO_NOTIFICA_ERRO_TEXTO,
							text_escape  : false,
							type         : "error"
						});
					}

				})
		}
		/* CARREGAMENTO DO ESTADOS */
		function loadListStates() {
			if ($localStorage.listStates == undefined) {
				vm.listState  = cecStatestLoadFactory.getAll()
				vm.listStates = $localStorage.listStates;
				$localStorage.listStates = vm.listStates;
			} else {
				vm.listStates = $localStorage.listStates;
			}
		}

		// INICIANDO AS FUNÇÕES
		loadListStates();
		_reset();

	}
})();