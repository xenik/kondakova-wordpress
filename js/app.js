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
        CONTACTS: '/contacts',
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

        $routeProvider.when(URLS.ROUTES.CONTACTS, {
          //templateUrl: path + 'contacts.html',
          templateUrl: path + 'contacts_without_address.html',
          controller: 'contactsController as vm'
        });

        $routeProvider.when(URLS.ROUTES.PRESS, {
          templateUrl: path + 'press.html'
        });

        $routeProvider.when(URLS.ROUTES.BASKET, {
          templateUrl: path + 'basket.html'
        });

        $routeProvider.when(URLS.ROUTES.DETAIL, {
          templateUrl: path + 'detail.html'
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
      list += "<li><a href='#collections?collection="+index+"' data-index='"+index+"'>" + item.name + "</a></li>";
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


});