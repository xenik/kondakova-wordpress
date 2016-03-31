angular.module('app').controller('contactsController', [function(){

        try {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('map', {
                        center: [55.793627, 37.545087],
                        zoom: 13
                    }, {
                        searchControlProvider: 'yandex#search'
                    }),
                    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                            hintContent: 'A Kondakova',//'Собственный значок метки',
                            balloonContent: 'A Kondakova office'//'Это красивая метка'
                        }
                    );

                myMap.geoObjects.add(myPlacemark);
            });
        }
        catch(ex) {
            $('#map').addClass('hidden');
        }

    }]);