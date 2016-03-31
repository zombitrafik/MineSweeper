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
                MESSAGE: 'MESSAGE',
                INVITATION: 'INVITATION'
            },
            loadNotifications: loadNotifications,
            notify: notify,
            init: init,
            set: set,
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

        function loadNotifications () {
            return cacheService.item(ROUTE_REQUIRES.NOTIFICATION);
        }

        function getNotifications () {
            service.notifications =  cacheService.local[ROUTE_REQUIRES.NOTIFICATION] || [];
            return service.notifications;
        }

        function notify (type, data) {
            var PREFIX = ROUTE_REQUIRES.NOTIFICATION;
            var url = type + '_' + data.sender;

            cacheService.item(PREFIX).then(function (item) {
                if(!item[url]) {
                    item[url] = 0;
                }
                item[url]++;
                cacheService.item(PREFIX, item).then(function () {
                    addLocalNotify(url, item[url]);
                });
            }).catch(function () {
                var item = {};
                item[url] = 0;
                cacheService.item(PREFIX, item).then(function () {
                    addLocalNotify(url, item[url]);
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

        function set (url, value) {
            var PREFIX = ROUTE_REQUIRES.NOTIFICATION;
            service.notifications[url] = value;
            cacheService.item(PREFIX).then(function (item) {
                item[url] = value;
                cacheService.item(PREFIX, item);
            });
        }
    }
})();