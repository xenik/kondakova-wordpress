angular.module('app').controller('rootController', [function () {

        var resize = function () {
            //$('#all-footer').addClass('hidden');
            var window_height = $(window).height();
            var navbar_height = $('#navbar').height();
            $('#intro-image').css('height', window_height - navbar_height);
            console.log(window_height);
            console.log(navbar_height);
        };

        resize();

        $(window).on('resize', function () {
            resize();
            console.log('tyt');
//($('#navbar').outerHeight(true)+$('#all-footer').outerHeight(true)+$('#all-content').outerHeight(true)) < $(window).outerHeight(true)
            if( $(document).outerHeight(true) > $(window).outerHeight(true)) {
              $('#all-content').css('height', (($(document).outerHeight(true) - $('#navbar').outerHeight(true) - $('#all-footer').outerHeight(true)).toString() + 'px'));
            } else {
              $('#all-content').css('height', (($(window).outerHeight(true) - $('#navbar').outerHeight(true) - $('#all-footer').outerHeight(true)).toString() + 'px'));
//              var a = ($(window).outerHeight(true) - $('#navbar').outerHeight(true) - $('#all-footer').outerHeight(true));
              var b = $('#all-content').css('height');
              $('#all-content').css('height', '+='+($(window).outerHeight(true) - $('#navbar').outerHeight(true) - $('#all-footer').outerHeight(true) - b).toString() + 'px');
            }
        });

        this.hideFooter = true;
        //http://jsfiddle.net/maniator/JVKbR/
    }]);