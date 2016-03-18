(function () {
    angular
        .module('app')
        .service('stateService', stateService);
    
    stateService.$inject = ['$state'];
        
    function stateService ($state) {
        var service = {
            isThisPage: isThisPage
        };
        return service;

        function isThisPage (page) {
            if(_.isArray(page)) {
                return _.includes(page, $state.current.name)
            }   else {
                return $state.current.name === page;
            }
        }

    }
})();