angular.module('app')
    .controller('rootController', [function () {

        var resize = function () {
            //$('#all-footer').addClass('hidden');
            var window_height = $(window).height();
            var navbar_height = $('#navbar').height();
            $('#intro-image').css('height', window_height - navbar_height);
            console.log(window_height);
            console.log(navbar_height);
        }

        resize();

        $(window).on('resize', function () {
            resize();
        });

        this.hideFooter = true;
    }]);