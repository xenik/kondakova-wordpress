angular.module('app')
    .controller('contactsController', [function(){

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
                        //    , {
                        //    // Опции.
                        //    // Необходимо указать данный тип макета.
                        //    iconLayout: 'default#image',
                        //    // Своё изображение иконки метки.
                        //    iconImageHref: 'images/myIcon.gif',
                        //    // Размеры метки.
                        //    iconImageSize: [30, 42],
                        //    // Смещение левого верхнего угла иконки относительно
                        //    // её "ножки" (точки привязки).
                        //    iconImageOffset: [-3, -42]
                        //}
                    );

                myMap.geoObjects.add(myPlacemark);
            });
        }
        catch(ex) {
            $('#map').addClass('hidden');
        }

    }]);