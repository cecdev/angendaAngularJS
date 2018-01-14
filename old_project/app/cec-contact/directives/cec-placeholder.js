(function () {
    'use strict';

    angular
        .module('cecContactApp')
        .directive('cecPlaceholder', cecPlaceholder);

    cecPlaceholder.$inject = ['cecLoadLang', '$localStorage', '$sessionStorage', '$window'];

    /* @ngInject */
    function cecPlaceholder(cecLoadLang, $localStorage, $sessionStorage, $window) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            var vm = scope;
            if ($localStorage.translate == undefined) {
                cecLoadLang.load_translate(document.documentElement.lang)
                    .then(load_translate => {
                        
                        //- Carrego a tradução dos textos
                        var lang                = load_translate;
                        $localStorage.translate = lang;

                        vm.lang = angular.fromJson(lang);
                        element[0].setAttribute("placeholder", vm.lang[attrs.cecPlaceholder]);
                    });
            } else {
                vm.lang = angular.fromJson($localStorage.translate);
                element[0].setAttribute("placeholder", vm.lang[attrs.cecPlaceholder]);
            }
        }
    }

})();