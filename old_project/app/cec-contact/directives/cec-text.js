(function () {
	'use strict';

	angular
		.module('cecContactApp')
		.directive('cecText', cecText);

	cecText.$inject = ['$rootScope', 'cecLoadLang', '$localStorage', '$sessionStorage', '$window', ];

	/* @ngInject */
	function cecText($rootScope, cecLoadLang, $localStorage, $sessionStorage, $window) {

		var directive = {
			link: link,
			restrict: 'A',
			scope: {}
		};
		return directive;

		function link(scope, element, attrs) {
			var parent = $rootScope;
			var vm = scope;
			if ($localStorage.translate == undefined) {
				cecLoadLang.load_translate(document.documentElement.lang)
					.then(load_translate => {
						//- Carrego a tradução dos textos
						var lang = load_translate;
						$localStorage.translate = lang;
						vm.lang = angular.fromJson(lang);
						if (parent.lang == undefined) {
							parent.lang = vm.lang;

						}
						element[0].innerHTML = vm.lang[attrs.cecText];
					});
			} else {
				vm.lang = angular.fromJson($localStorage.translate);
				if (parent.lang == undefined) {
					parent.lang = vm.lang;

				}
				element[0].innerHTML = vm.lang[attrs.cecText];
			}
		}
	}

})();