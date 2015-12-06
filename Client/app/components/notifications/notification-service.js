(function () {
    angular
        .module('app')
        .service('notificationService', notificationService);

    notificationService.$inject = ['cacheService'];

    function notificationService (cacheService) {
        var service = {
            notifications: {},
            getNotifications: getNotifications,
            TYPES: {
                MESSAGE: 'MESSAGE'
            },
            notify: notify,
            init: init,
            remove: remove
        };

        return service;

        function init () {
            var notifications = cacheService.local[ROUTE_REQUIRES.NOTIFICATION];
            if(notifications) {
                service.notifications = notifications.data;
            } else {
                service.notifications = {};
            }
        }

        function getNotifications () {
            return _.toArray(service.notifications);
        }

        function notify (type, data) {
            var TYPES = service.TYPES;
            var PREFIX = ROUTE_REQUIRES.NOTIFICATION;
            var url = '';
            switch (type) {
                case TYPES.MESSAGE: {
                    url = TYPES.MESSAGE + '_' + data.sender;
                    break;
                }
                default : {
                    console.log('such type does not exist');
                }
            }

            cacheService.item(PREFIX).then(function (item) {
                item[url] = data;
                cacheService.item(PREFIX, item).then(function () {
                    addLocalNotify(url, data);
                });
            }).catch(function () {
                var item = {};
                item[url] = data;
                cacheService.item(PREFIX, item).then(function () {
                    addLocalNotify(url, data);
                });
            })
        }

        function addLocalNotify (url, data) {
            service.notifications[url] = data;
        }

        function remove (url) {
            var PREFIX = ROUTE_REQUIRES.NOTIFICATION;
            delete service.notifications[url];
            cacheService.item(PREFIX).then(function (item) {
                delete item[url];
                cacheService.item(PREFIX, item);
            });
        }
    }
})();