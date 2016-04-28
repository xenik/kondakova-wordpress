angular.module('app').controller('basketsController', [function(){

  if ($('#navigation').hasClass('in')) {
    $('.navbar-toggle.btn-primary[data-toggle=collapse]').click();
  }

  function cleanedBasket(){
    $('#js-basket-table-body').empty();
    $('#js-basket-table-amout').empty();
    $('#js-answer-promo-codes').empty();
    $('#js-basket-table-amout').append('<tr style="font-size: 1.5rem;"><th colspan="5"><small>Итого</small></th><th colspan="2" class="text-right" id="js-basket-table-amout__total"><small></small></th><th></th></tr>');
    $('#js-basket-table-body').append("<tr><td colspan='8' class='bg-info text-center'> Вы еще не добавляли товары в корзину.</tr>");
    $('#js-basket-btn-order').addClass('hide');
    $('#js-basket-table-amout__total').text('0').append('&nbsp;<i class="fa fa-rub"></i>');
    $('#js-promo-code').val('');
    $('#js-cart-items').text('');
    $('#js-cart-items-xs').text('');
    kondakova.cart = [];
    kondakova.promo = undefined;
  }

  if (kondakova.cart && kondakova.cart.length > 0) {
    renderCartItems();
  } else {
    cleanedBasket();
  }

  function renderCartItems() {
    var tds = '';
    var total_amount = 0.00;
    var row_amount   = 0.00;
    $('#js-basket-table-body').empty();

    var price = "";

    $.each( kondakova.cart, function(i, v) {

      if (v.sales_price) {
        price = v.sales_price;
      } else {
        price = v.price;
      }

      row_amount = (Number(price) * Number(v.qty)).toString();
      total_amount = Number(Number(total_amount) + Number(row_amount)).toString();

      tds += "<tr><td><a href='#detail?" + v.id + "'>"+v.id+"</a></td>" +
             "<td><a href='#detail?" + v.id + "'><img src='img/collections/"+v.links[0]+"' alt='"+v.name+"'></a></td>" +
             "<td><a href='#detail?" + v.id + "'>"+v.name+"</a></td>" +
             "<td>"+v.size+"</td>"+
             "<td><input type='number' value='"+v.qty+"' class='form-control cart_qty' min='1' data-idx='"+i+"'></td>" +
             "<td class='cart_price'>"+numbersToMoneyView(price)+" <i class='fa fa-rub'></i></td><td class='cart_amount'>"+ numbersToMoneyView(row_amount) +" <i class='fa fa-rub'></i></td><td><a href='#basket'><i class='fa fa-trash-o'></i></a></td>"+
             "<td class='hide'>"+v.line_item_id+"</td></tr>";
    });


    $('#js-basket-table-body').append(tds);
    $('#js-basket-table-amout__total').text(numbersToMoneyView(total_amount));
    $('#js-basket-table-amout__total').append("&nbsp;<i class='fa fa-rub' style='font-size:1.7rem;'></i>");

    $('#js-basket-table-amout__sale-result').text( numbersToMoneyView((parseFloat(total_amount-kondakova.promo)).toString()) );
    $('#js-basket-table-amout__sale-result').append("&nbsp;<i class='fa fa-rub' style='font-size:1.7rem;'></i>");

    $('.fa-trash-o').on('click',function() {
      var line_item_id = $(this).parent().parent().next().text();

      kondakova.cart = kondakova.cart.filter(function(el) { return el.line_item_id != line_item_id;} );

      $('#js-cart-items').text(kondakova.cart.length);
      $('#js-cart-items-xs').text(kondakova.cart.length);

      if(kondakova.cart && kondakova.cart.length > 0){
        renderCartItems();
      } else {
        cleanedBasket();
      }

    });


    $('.cart_qty').on('change', function(e) {
      var el = $(this),
          value = el.val(),
          idx = el.data('idx');
          kondakova.cart[idx].qty = Number(value);
          renderCartItems();
    });
  }

  $("#basket-form").validate({
      rules: {
          user_name: "required",
          user_email: {
              required: true,
              email: true
          },
          user_phone: {
              required: true,
              rangelength: [5,11],
              digits: true
          }
      },
      errorClass: "text-danger",
      submitHandler: function(form) {

        var formData = {
        'user_name'              : $('#user_name').val(),
        'user_email'             : $('#user_email').val(),
        'user_phone'             : $('#user_phone').val(),
        'user_comment'           : $('#user_comment').val(),
        'user_cart'              : kondakova.cart,
        'user_promo'             : (kondakova.promo ? kondakova.promo : ""),
        'user_amount'            : kondakova.cart_sum()
        };

        var d = $.ajax({
          type: "post",
          url: "php/basket.php",
          data: formData,
          success: function(a,b,c){
            //  console.log(a,b,c);
          },
          error: function(x,y,z){
             // console.log(x,y,z);
          }
        });

        d.done(function(){
          $('#bs-example-modal-sm').modal('hide');
          cleanedBasket();
          $('#js-basket-alert').bs_success('Спасибо, Мы свяжемся с Вами в ближайшее время!');
          createAutoClosingAlert(".alert", 2500);
        });
    }
  });

  $('#js-basket-btn-order-send').on('click', function() {
    $("#basket-form").submit();
  });

}]);