angular.module('app').controller('detailsController', [function(){
  // console.log('hello from detailsController');
  var atelier = location.hash.split('?')[1].split(':')[1];
  var item_id = location.hash.split('?')[1].split(':')[0];
  // console.log(item_id);
  // console.log(atelier);
  var ajax_products = null;
  var item = null;

  //console.log(item_id);

  if(kondakova.products == undefined) {
    // console.log('hi from undefined...');
    ajax_products = $.ajax({
      url: 'js/json/products.json',
      type: 'GET',
      dataType: 'json',
      data: ""
    }).done(function(data) {
      kondakova.products = data.category;
    }).fail(function() {
      console.error("Ошибка загрузки товара c товаром: " + item_id);
    });
  } else {
    // console.log('hi from new deffered()');
    ajax_products = $.Deferred();
    ajax_products.resolve('true');
    ajax_products.promise();
  }

  // console.log('hi before done()');

  ajax_products.done(function(a,b,c) {
    // console.log('hi from inside done()');
    var list = '';

    $.each(kondakova.products, function(i, v) {
      $.each(v.items, function (idx, val) {
        if (item_id == val.id) {
          item = val;
        }
      });
    });

    //console.log(item);
    $('.container  h3.text-uppercase').text(item.name);
    $('.container  h3.text-uppercase + p.text-muted').text(item.description);


    if(atelier === undefined){
      console.log('hi from undefined atelier');
      $('#detail-form__atelier').addClass('hide');
      $('#detail-form__all').removeClass('hide');

      $('.container  p.price').text(item.price);
      $('#js-details-structure ul').empty();

      $.each(item.sctucture, function(i, v) {
        list += "<li>"+ v + "</li>";
      });
      $('#js-details-structure ul').append(list);

    } else {
      console.log('hi atelier');
      $('#detail-form__atelier').removeClass('hide');
      $('#detail-form__all').addClass('hide');
    }


    productDetailSizes();
    $('[data-toggle="tooltip"]').tooltip();
    $('#js-details-btn-add-into-cart__on').popover();


    if(atelier !== undefined){
      console.log('atelier is undefined second time');
      $('#js-details-btn-add-into-cart__on__atelier').on('click',function() {
        var flag = false,
            cart_line_item = {};
          Object.keys(item).forEach(function(key) {
            cart_line_item[key] = item[key];
          });

        $.each(kondakova.cart, function(i, v) {
          if (v.id == cart_line_item.id) {
            v.qty += 1;
            flag = true;
          }
        });

        if (flag === false) {
          cart_line_item.qty = 1;
          cart_line_item.size = '';
          cart_line_item.price = '';
          cart_line_item.line_item_id = (new Date()).getTime();
          kondakova.cart.push(cart_line_item);
        }

        $('#js-cart-items').text(kondakova.cart.length);
        $('#js-cart-items-xs').text(kondakova.cart.length);
      });

    } else {
      console.log('..............msg........');
      $('#js-details-btn-add-into-cart__on').on('click',function() {
        var flag = false,
            size = $('[type=radio]:checked').val(),
            cart_line_item = {};
        // item.sizes = item.sizes || [];
          Object.keys(item).forEach(function(key) {
            cart_line_item[key] = item[key];
          });
          cart_line_item.size = size;


        $.each(kondakova.cart, function(i, v) {
          if (v.id == cart_line_item.id && cart_line_item.size == v.size) {
            v.qty += 1;
            flag = true;
          }
        });

        if (flag === false) {
          cart_line_item.qty = 1;
          cart_line_item.size = size;
          cart_line_item.line_item_id = (new Date()).getTime();
          // console.log(cart_line_item);
          // console.log(kondakova.products);
          kondakova.cart.push(cart_line_item);
        }

        $('#js-cart-items').text(kondakova.cart.length);
        $('#js-cart-items-xs').text(kondakova.cart.length);
      });
    }


  });

  console.log('hi before exit from detailsController');


  productDetailGallery(5000);
}]);