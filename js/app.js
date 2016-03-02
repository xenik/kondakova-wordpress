'use strict';

var app = angular.module('app', ['ngCookies', 'ngRoute']);

// CONSTANTS
app.constant('URLS', {
  IMAGES: {
    UNKNOWN: '/images/unknown.png'
        //AVATAR: '/JQFile/Avatar/'
      },
      ROUTES: {
        ROOT: '/',
        ABOUT: '/about',
        COLLECTIONS: '/collections',
        INFO:'/info',
        NEWS: '/news',
        // CONTACTS: '/contacts',
        PRESS: '/press',
        SHOP: '/shop',
        BASKET: '/basket',
        DETAIL: '/detail'
      },
      PATHS: {
        TEMPLATES: 'views/',
        MENU: 'views/partials/_menu.html',
        FOOTER: 'views/partials/_footer2.html'
        //FOOTER: 'views/partials/_footer.html' // трех колоночный для адреса
      }
    });

app.run(['$rootScope', 'URLS', '$location',
  function ($rootScope, URLS, $location) {
    $rootScope.URLS = URLS;
  }]);

app.config(['$routeProvider', '$locationProvider', 'URLS',
  function ($routeProvider, $locationProvider, URLS) {

        //$locationProvider.hashPrefix('!');

        // configuring routing
        //var path = 'AKondakova' + URLS.PATHS.TEMPLATES;
        var path = '' + URLS.PATHS.TEMPLATES;

        // routing setup
        $routeProvider.when(URLS.ROUTES.ROOT, {
          templateUrl: path + 'root.html',
          controller: 'rootController as vm'
        });

        $routeProvider.when(URLS.ROUTES.ABOUT, {
          templateUrl: path + 'about.html'
        });

        $routeProvider.when(URLS.ROUTES.COLLECTIONS, {
          templateUrl: path + 'collections.html',
          controller: 'collectionsController as vm'
        });

        $routeProvider.when(URLS.ROUTES.INFO, {
          templateUrl: path + 'info.html'
        });

        $routeProvider.when(URLS.ROUTES.SHOP, {
          templateUrl: path + 'shop.html',
          controller: 'shopsController as vm'
        });

        $routeProvider.when(URLS.ROUTES.NEWS, {
          templateUrl: path + 'news.html'
        });

        // $routeProvider.when(URLS.ROUTES.CONTACTS, {
        //   //templateUrl: path + 'contacts.html',
        //   templateUrl: path + 'contacts_without_address.html',
        //   controller: 'contactsController as vm'
        // });

        $routeProvider.when(URLS.ROUTES.PRESS, {
          templateUrl: path + 'press.html'
        });

        $routeProvider.when(URLS.ROUTES.BASKET, {
          templateUrl: path + 'basket.html',
          controller: 'basketsController as vm'
        });

        $routeProvider.when(URLS.ROUTES.DETAIL, {
          templateUrl: path + 'detail.html',
          controller: 'detailsController as vm'
        });

        $routeProvider.otherwise({
          redirectTo: '/index.html'
        });


        //routing DOESN'T work without html5Mode
        //$locationProvider.html5Mode(true);
        //$locationProvider.html5Mode({
        //    enabled: true
        //    //requireBase: false
        //});
      }]);

$(function(){
//{param1: 'value1'}

  window.kondakova = {};
  window.kondakova.cart = [];

  $("#js-menu-collections").empty();
  $.ajax({
    url: './js/json/menu-collections.json',
    type: 'GET',
    dataType: 'json',
    data: ""
  }).done(function(data) {
    //console.info(data.collections);
    window.kondakova.collections = data.collections;
    var list = '';
    $(data.collections).each(function(index, item) {
      list += "<li><a href='#collections?collection="+index+"' data-index='"+index+"' class='menu-item'>" + item.name + "</a></li>";
    });
    $("#js-menu-collections").html(list);
  }).fail(function() {
    console.error("ошибка загрузки меню для коллекций..");
  });
  // .always(function() {
  //   console.log("complete");
  // });

  window.kondakova.sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  };



  //sliderHomepage();
  //fullScreenContainer();
  //productDetailGallery(4000); //moved to detailsControllet
  productQuickViewGallery();
  //menuSliding();
  productDetailSizes();
  utils();
  //demo();

});



/*********************************************************/


/* menu sliding */
/*
  function menuSliding() {

    $('.dropdown').on('show.bs.dropdown', function (e) {

  if ($(window).width() > 750) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown();

  }
  else {
      $(this).find('.dropdown-menu').first().stop(true, true).show();
  }
    }

    );
    $('.dropdown').on('hide.bs.dropdown', function (e) {
  if ($(window).width() > 750) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  }
  else {
      $(this).find('.dropdown-menu').first().stop(true, true).hide();
  }
    });

  }

  menuSliding();
*/

/* picture zoom */

// function pictureZoom() {
//   $('.product .image, .post .image').each(function () {
//     var imgHeight = $(this).find('img').height();
//     $(this).height(imgHeight);
//   });
// }

//full screen intro

// function fullScreenContainer() {
//   var screenWidth = $(window).width() + "px";
//   var screenHeight = '';

//   if ($(window).height() > 500) {
//     screenHeight = $(window).height() + "px";
//   }
//   else {
//     screenHeight = "500px";
//   }

//   $("#intro, #intro .item").css({ width: screenWidth, height: screenHeight });
// }


function utils() {

    /* tooltips */
    $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio */
    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
      var radio = $(this).find(':radio');
      radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function (e) {
      window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/
  $('.external').on('click', function (e) {
    e.preventDefault();
    window.open($(this).attr("href"));
  });
    /* animated scrolling */

  $('.scroll-to, .scroll-to-top').click(function (event) {
    var full_url = this.href;
    var parts = full_url.split("#");
    if (parts.length > 1) {

        scrollTo(full_url);
        event.preventDefault();
    }
  });

  function scrollTo(full_url) {
    var parts = full_url.split("#");
    var trgt = parts[1];
    var target_offset = $("#" + trgt).offset();
    var target_top = target_offset.top - 100;
    if (target_top < 0) {
        target_top = 0;
    }

    $('html, body').animate({
        scrollTop: target_top
    }, 1000);
  }
}

function str_to_numeric_to_fixed(str) {
  var helpNum = 0;
  helpNum = +str;
  return helpNum.toFixed(2);
}


/* product detail gallery */
function productDetailGallery(confDetailSwitch) {
  $('#productMain .thumb:first').addClass('active');
  var timer = setInterval(autoSwitch, confDetailSwitch);

  $("#productMain .thumb").click(function (e) {
    console.log('hello moto');
    switchImage($(this));
    clearInterval(timer);
    timer = setInterval(autoSwitch, confDetailSwitch);
    e.preventDefault();
  });

  $('#productMain #mainImage').hover(
    function () { clearInterval(timer); },
    function () { timer = setInterval(autoSwitch, confDetailSwitch); });

  function autoSwitch() {
    var nextThumb = $('#productMain .thumb.active').closest('div').next('div').find('.thumb');

    if (nextThumb.length === 0) {
      nextThumb = $('#productMain .thumb:first');
    }

    switchImage(nextThumb);
  }

  function switchImage(thumb) {
    $('#productMain .thumb').removeClass('active');
    var bigUrl = thumb.attr('href');
    thumb.addClass('active');

    $('#productMain #mainImage img').attr('src', bigUrl);
  }
}

function productQuickViewGallery() {
  $('.quick-view').each(function () {
    var element = $(this);

    element.find('.thumb:first').addClass('active');

    element.find(".thumb").click(function (e) {
      switchImage($(this));
      e.preventDefault();
    });

  });

  function switchImage(thumb) {
    thumb.parents('.quick-view').find('.thumb').removeClass('active');
    var bigUrl = thumb.attr('href');
    thumb.addClass('active');
    thumb.parents('.quick-view').find('.quick-view-main-image img').attr('src', bigUrl);
  }
}

/* product detail sizes */
function productDetailSizes() {
  $('.sizes a').click(function (e) {
    e.preventDefault();
    $('.sizes a').removeClass('active');
    $('.size-input').prop('checked', false);
    $(this).addClass('active');
    $(this).next('input').prop('checked', true);
    $('#js-details-btn-add-into-cart__on').removeClass('hide');
    $('#js-details-btn-add-into-cart__off').addClass('hide');
  });
}


$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

  var maxHeight = 0;
  var children = $(this).find('.same-height');
  children.height('auto');
  if ($(window).width() > 768) {
      children.each(function () {
    if ($(this).innerHeight() > maxHeight) {
        maxHeight = $(this).innerHeight();
    }
      });
      children.innerHeight(maxHeight);
  }

  maxHeight = 0;
  children = $(this).find('.same-height-always');
  children.height('auto');
  children.each(function () {
      if ($(this).innerHeight() > maxHeight) {
    maxHeight = $(this).innerHeight();
      }
  });
  children.innerHeight(maxHeight);
    });
};


/*
$(window).load(function () {
    var windowWidth = $(window).width();
    $(this).alignElementsSameHeight();
    //pictureZoom();
});


$(window).resize(function () {
  var newWindowWidth = $(window).width();
  var windowWidth;

  if (windowWidth !== newWindowWidth) {
    setTimeout(function () {
        $(this).alignElementsSameHeight();
        fullScreenContainer();
        //pictureZoom();
    }, 100);
    windowWidth = newWindowWidth;
  }
});
*/

$('body').on('click', function(event) {
  //console.log($(event.target).hasClass('menu-item'));
  if ($(event.target).hasClass('menu-item')) {
    $('[data-toggle=collapse]').click();
  }
});

