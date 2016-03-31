angular.module('app').controller('rootController', [function () {

        var resize = function () {
            var window_height = $(window).height();
            var navbar_height = $('#navbar').height();
            $('#intro-image').css('height', window_height - navbar_height);
        };
        resize();

        $(window).on('resize', function () {
            resize();
            if( $(document).outerHeight(true) > $(window).outerHeight(true)) {
              $('#all-content').css('height', (($(document).outerHeight(true) - $('#navbar').outerHeight(true) - $('#all-footer').outerHeight(true)).toString() + 'px'));
            } else {
              $('#all-content').css('height', (($(window).outerHeight(true) - $('#navbar').outerHeight(true) - $('#all-footer').outerHeight(true)).toString() + 'px'));
              var b = $('#all-content').css('height');
              $('#all-content').css('height', '+='+($(window).outerHeight(true) - $('#navbar').outerHeight(true) - $('#all-footer').outerHeight(true) - b).toString() + 'px');
            }
        });
        this.hideFooter = true;
        //http://jsfiddle.net/maniator/JVKbR/
    }]);