(function() {
    'use strict';

    angular
        .module('cecContactApp')
        .component('cecSelectStates', {
            templateUrl: 'app/cec-contact/components/cecSelectStates.html',
            controller: cecSelectStatesComponentController,
            bindings: {
                cecId: '<',
                cecModel: '=',
                cecSelect2: '<'

            },
            transclude: false

        });

   cecSelectStatesComponentController.$inject = ['$rootScope','$timeout', '$localStorage', '$sessionStorage', '$window'];

    /* @ngInject */
    function cecSelectStatesComponentController($rootScope,$timeout, $localStorage, $sessionStorage, $window) {
    	var parent = $rootScope;
        var vm = this;
        vm.selectText = undefined;
        vm.listStates = undefined;

        $timeout(function () {
            vm.selectText = parent.lang.PAINEL_COMBO_ESTADO_SELECIONE;
            vm.listStates = $localStorage.listStates;



        }, 3000);
      
    }
})();



