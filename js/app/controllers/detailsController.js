angular.module('app').controller('detailsController', [function(){

  var item_name = location.hash.split('?')[1];

  console.log(item_name);

  if(kondakova.products == undefined) {

    var ajax_products = $.ajax({
      url: 'js/json/products.json',
      type: 'GET',
      dataType: 'json',
      data: ""
    }).done(function(data) {
      kondakova.products = data.category;
    }).fail(function() {
      console.error("Ошибка загрузки товара c товаром: " + item_name);
    });
  }

  ajax_products.done(function(a,b,c) {
    console.log('go gog og');
  });


}]);