angular.module('app').controller('basketsController', [function(){
  // console.log('hello from basketsController');

  if (kondakova.cart && kondakova.cart.length > 0) {
    // console.log(kondakova.cart);
    renderCartItems();
  } else {

    $('#js-basket-table-body').empty();
    $('#js-basket-table-body').append("<tr><td colspan='7' class='bg-info text-center'> Вы еще не добавляли товары в корзину.</tr>");
    $('#js-basket-btn-order').addClass('hide');

  }

  function renderCartItems() {
    var tds = '';
    $('#js-basket-table-body').empty();


    $.each( kondakova.cart, function(i, v) {

      tds += "<tr><td><a href='#detail?" + v.id + "'><img src='"+v.link+"' alt='"+v.name+"'></a></td>" +
             "<td><a href='#detail?" + v.id + "'>"+v.name+"</a></td>" +
             "<td>"+v.size+"</td>"+
             "<td><input type='number' value='"+v.qty+"' class='form-control cart_qty' min='1' data-idx='"+i+"'></td>" +
             "<td class='cart_price'>"+v.price+"</td><td>"+0.00+"</td><td class='cart_amount'>"+((v.price === '') ? '-' : (str_to_numeric_to_fixed(v.qty * v.price)) ) +"</td><td><a href='#basket'><i class='fa fa-trash-o'></i></a></td>"+
             "<td class='hide'>"+v.line_item_id+"</td></tr>";

    });
    $('#js-basket-table-body').append(tds);

    $('.fa-trash-o').on('click',function() {
       var line_item_id = $(this).parent().parent().next().text();

      // $.each( kondakova.cart, function (idx, val) {
      //   if(val.line_item_id == line_item_id) {
      //     console.log(val);
      //   }
      // });

      kondakova.cart = kondakova.cart.filter(function(el) { return el.line_item_id != line_item_id;} );
      renderCartItems();
    });

    $('.cart_qty').on('blur', function(e) {
      // console.log('hello world blur');
    });

    $('.cart_qty').on('change', function(e) {
      //console.log('hello world change');
      var el = $(this),
          value = el.val(),
          idx = el.data('idx'); //,
          // price = el.parent().parent().find('.cart_price').text(),
          // amount = el.parent().parent().find('.cart_amount').text();

          // console.log(kondakova.cart);
          // console.log(value);
          kondakova.cart[idx].qty = Number( Number(value).toFixed(2));
          renderCartItems();
    });


    $('.cart_qty').on('mouseout', function(e) {
      // console.log( $(this).val() );
      kondakova.cart[$(this).data('idx')].qty = Number( Number($(this).val()).toFixed(2));
      renderCartItems();
    });

    // $('.cart_qty').on('mouseover', function(e) { return false; } );

  }

  $('#js-basket-btn-order-send').on('click', function() {
    alert("Спасибо, мы свяжемся с Вами в близжайшее время! \n p.s. Я не успел подключить отправку на почту. \n наверное нужно очищать корзину, да?");
    $('#bs-example-modal-sm').modal('hide');
  });


}]);