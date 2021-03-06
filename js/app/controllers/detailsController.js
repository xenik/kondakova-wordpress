angular.module('app').controller('detailsController', [function(){
  var atelier = location.hash.split('?')[1].split(':')[1];
  var item_id = location.hash.split('?')[1].split(':')[0];

  if (item_id == undefined) { location.hash = '/'; }

  var ajax_products = null;
  var item = null;

  if(kondakova.products == undefined) {
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
    ajax_products = $.Deferred();
    ajax_products.resolve('true');
    ajax_products.promise();
  }

  ajax_products.done(function(a,b,c) {
    var list = '';

    $.each(kondakova.products, function(i, v) {
      $.each(v.items, function (idx, val) {
        if (item_id == val.id) {
          item = val;
        }
      });
    });

    if(!(item)) { location.hash = '/'; }

    $('.container  h3.text-uppercase').text(item.name);
    $('.container  h3.text-uppercase + p.text-muted').text(item.description);

    //images
    $('#mainImage').append('<img src="img/collections/'+item.links[0]+'" alt="" class="img-responsive">');
    for(var i = 0; i < 3; i++) {
      if(item.links[i]) {
        $('#thumbs').append('<div class="col-xs-4"><a href="img/collections/'+item.links[i]+'" class="thumb"> \
                             <img src="img/collections/'+item.links[i]+'" alt="" class="img-responsive"></a></div>');
      }
    }

    if(atelier === undefined){
      $('#detail-form__atelier').addClass('hide');
      $('#detail-form__all').removeClass('hide');

      if(item.sales_price) {
        $('#mainImage').after('<div class="ribbon sale"><div class="theribbon">SALE</div><div class="ribbon-background"></div></div>');
        $('#js-detail-sale-price').text(numbersToMoneyView(item.price)).parent().removeClass('hide');
        $('#js-detail-price').text(numbersToMoneyView(item.sales_price));
      } else {
        $('#js-detail-price').text(numbersToMoneyView(item.price));
      }

      $('#js-details-structure ul').empty();

      if(item.structure) {
        $.each(item.structure, function(i, v) {
          list += "<li>"+ v + "</li>";
        });
        $('#js-details-structure ul').append(list);
      } else {
        $("#js-details-structure").addClass('hide');
      }
    } else {
      $('#detail-form__atelier').removeClass('hide');
      $('#detail-form__all').addClass('hide');
    }

    productDetailSizes();
    $('[data-toggle="tooltip"]').tooltip();
    $('#js-details-btn-add-into-cart__on').popover();

    if(atelier !== undefined){
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

        $('#js-detail-atelier-alert').bs_success('Вы успешно положили товар в корзину.');
        createAutoClosingAlert(".alert", 2500);
      });

    } else {
      $('#js-details-btn-add-into-cart__on').on('click',function() {
        var flag = false,
            size = $('[type=radio]:checked').val(),
            cart_line_item = {};
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
          kondakova.cart.push(cart_line_item);
        }

        $('#js-cart-items').text(kondakova.cart.length);
        $('#js-cart-items-xs').text(kondakova.cart.length);

        $('#js-detail-alert').bs_success('Вы успешно положили товар в корзину.');
        createAutoClosingAlert(".alert", 2500);
      });
    }
  });
  productDetailGallery(5000);
}]);