'use strict';

(function() {
var app = angular.module('app', ['ngCookies', 'ngRoute']);

app.constant('URLS', {
  IMAGES: { UNKNOWN: '/images/unknown.png' },
  ROUTES: {
    ROOT: '/',
    ABOUT: '/about',
    COLLECTIONS: '/collections',
    INFO:'/info',
    NEWS: '/news',
    PRESS: '/press',
    SHOP: '/shop',
    BASKET: '/basket',
    DETAIL: '/detail',
    POST: '/post'
  },
  PATHS: {
    TEMPLATES: 'views/',
    MENU: 'views/partials/_menu.html',
    FOOTER: 'views/partials/_footer2.html'
  }
});

app.run(['$rootScope', 'URLS', '$location',
  function ($rootScope, URLS, $location) {
    $rootScope.URLS = URLS;

    window.kondakova = {};
    window.kondakova.cart = [];

    kondakova.jx = $.ajax({url: './js/json/menu-collections.json',type: 'GET',dataType: 'json'
           }).done(function(data) { window.kondakova.collections = data.collections; });
}]);

app.config(['$routeProvider', '$locationProvider', 'URLS',
  function ($routeProvider, $locationProvider, URLS) {
        //$locationProvider.hashPrefix('!');
        // configuring routing
        var path = '' + URLS.PATHS.TEMPLATES;

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
          templateUrl: path + 'news.html',
          controller: 'postsController as ps'
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

        $routeProvider.when(URLS.ROUTES.POST, {
          templateUrl: path + 'post.html',
          controller: 'postsController as vm'
        });

        $routeProvider.when('/post/:id', {
          templateUrl: 'views/post.html',
          controller: 'postsController as vm'
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
})();


(function($){
    $.fn.extend({
        bs_danger: function(message, title){
            var cls='alert-danger';
            var html='<div class="alert '+cls+' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            if(typeof title!=='undefined' &&  title!==''){
                html+='<h4>'+title+'</h4>';
            }
            html+='<span>'+message+'</span></div>';
            $(this).html(html);
        },
        bs_warning: function(message, title){
            var cls='alert-warning';
            var html='<div class="alert '+cls+' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            if(typeof title!=='undefined' &&  title!==''){
                html+='<h4>'+title+'</h4>';
            }
            html+='<span>'+message+'</span></div>';
            $(this).html(html);
        },
        bs_info: function(message, title){
            var cls='alert-info';
            var html='<div class="alert '+cls+' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            if(typeof title!=='undefined' &&  title!==''){
                html+='<h4>'+title+'</h4>';
            }
            html+='<span>'+message+'</span></div>';
            $(this).html(html);
        },
        bs_success: function(message, title){
            var cls='alert-success';
            var html='<div class="alert '+cls+' alert-dismissable" style="margin-bottom:0;"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            if(typeof title!=='undefined' &&  title!==''){
                html+='<h4>'+title+'</h4>';
            }
            html+='<span>'+message+'</span></div>';
            $(this).html(html);
        }
    });
})(jQuery);





$(function(){
  /*
  var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
  $(document).on('click touchstart', '.backtotop', function() {
      if (iOS) {
          $('html, body', parent.document).animate({ scrollTop: $("body").offset().top},1500,"easeOutQuart");
      } else {
          $('html, body').animate({ scrollTop: $("body").offset().top},1500,"easeOutQuart");
      }
  });
  */

  // $("body .alert").delay(2000).slideUp(500, function() {
  //   $(this).alert('close');
  // });


  function makeMenu() {
    var list = '';
    $(kondakova.collections).each(function(index, item) {
      list += "<li><a href='#collections?collection="+index+"' data-index='"+index+"' class='menu-item'>" + item.name + "</a></li>";
    });
    $("#js-menu-collections").html(list);
    $('.menu-item').on('click touchstart', function(e) { $('body').scrollTop(0); });
  }

  kondakova.jx.done(function(data) { setTimeout(makeMenu,250);  });

  function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  $('body').on('click', '#approve_on_letters', function(){
    console.log('clicked on btn approve on letters');
    //alert('Временная заглушка: Спасибо, что подписались на рассылку.');
    var name = $(this).parent().find('input')[0].value;
    var mail = $(this).parent().find('input')[1].value;
    if(!name || !mail){
      return false;
    } else {
      if(validateEmail(mail)) {
        $(this).parent().find('input')[0].value = "";
        $(this).parent().find('input')[1].value = "";

        var formData = { 'name': name, 'mail': mail };

        var d = $.ajax({
          type: "post",
          url: "letters.php",
          data: formData,
          success: function(a,b,c){
             //alert("Email sent");
            //  console.log(a,b,c);
          },
          error: function(x,y,z){
             console.log(x,y,z);
            //  alert("Please try to resubmit");
          }
        });


        return true;
      } else {
        return false;
      }
    }
  });




  $('body').on('click', '#js-check-promo-codes', function(){

    var code_for_check = $('#js-promo-code').val();
    var promo = {};

    if(kondakova.cart.length > 0) {

      if(kondakova.promo === undefined) {
        $.ajax({url: 'js/json/promo.json',type: 'get',dataType:'json'}).done(function(data) {
          if(data) {
            $.each(data.codes, function(i,v) {
              if(v.number == code_for_check) {
                promo = v;
              }
            });

            if(promo && promo.number) {
              $('#js-answer-promo-codes').bs_success('Поздарвляем! Вы получаете скидку на сумму ' + promo.amount + promo.type); //, 'title'
              createAutoClosingAlert(".alert", 2500);
              var amount = $('#js-basket-table-amout__total').text();
              amount       = +amount;
              promo.amount = +promo.amount;
              kondakova.promo = promo.amount;

              if(amount !== 0){
                $('#js-basket-table-amout').append('<tr><th colspan="7"><small>Скидка</small></th><th id="js-basket-table-amout__sale"><small>'+
                  (promo.amount).toFixed(2)+'</small></th><th></th></tr>');
                $('#js-basket-table-amout').append('<tr><th colspan="7"><small>Итого</small></th><th id="js-basket-table-amout__sale-result"><small>'+
                  (amount-promo.amount).toFixed(2)+'</small></th><th></th></tr>');
                $('#js-basket-table-amout tr:first-child').addClass('text-line-through');
              }
              //kondakova.cart
            } else {
              $('#js-answer-promo-codes').bs_danger('Извините, но данный код не является нашим промо-кодом.');
              createAutoClosingAlert(".alert", 2500);
            }

          }
        });
      } else {
        $('#js-answer-promo-codes').bs_danger('Вы уже использовали промо код.');
              createAutoClosingAlert(".alert", 2500);
      }
  } else {
    $('#js-answer-promo-codes').bs_danger('На пустой корзине нельзя использовать промо код.');
          createAutoClosingAlert(".alert", 2500);
  }

  });

  //sliderHomepage();
  //fullScreenContainer();
  //productDetailGallery(4000); //moved to detailsControllet
   productQuickViewGallery();//moved to  collectionsController
  // //menuSliding();
   productDetailSizes();//moved to collectionsController
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

  function createAutoClosingAlert(selector, delay) {
    var alert = $(selector).alert();
    window.setTimeout(function() { alert.alert('close'); }, delay);
  }




/* picture zoom */

function pictureZoom() {
  $('.product .image, .post .image').each(function () {
    var imgHeight = $(this).find('img').height();
    $(this).height(imgHeight);
  });
}

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
      // console.log('hello from productQuickViewGallery');
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
  // console.log('hello from productDetailSizes');
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
  // console.log('hello from alignElementsSameHeight');
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



$(window).load(function () {
    var windowWidth = $(window).width();
    $(this).alignElementsSameHeight();
    pictureZoom();
});
/*

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

$('body').on('click', 'menu-item', function(event) {
  //console.log($(event.target).hasClass('menu-item'));
//  if ($(event.target).hasClass('menu-item')) {
    $('[data-toggle=collapse]').click();
//  }
});

