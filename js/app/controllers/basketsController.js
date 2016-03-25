angular.module('app').controller('basketsController', [function(){
  // console.log('hello from basketsController');

  function cleanedBasket(){
    $('#js-basket-table-body').empty();
    $('#js-basket-table-amout').empty();
    $('#js-answer-promo-codes').empty();
    $('#js-basket-table-amout').append('<tr><th colspan="7">Итого</th><th id="js-basket-table-amout__total"></th><th></th></tr>');
    $('#js-basket-table-body').append("<tr><td colspan='9' class='bg-info text-center'> Вы еще не добавляли товары в корзину.</tr>");
    $('#js-basket-btn-order').addClass('hide');
    $('#js-basket-table-amout__total').text('0.00');
    $('#js-promo-code').val('');
    $('#js-cart-items').text('');
    $('#js-cart-items-xs').text('');
    kondakova.cart = [];
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


    $.each( kondakova.cart, function(i, v) {
      //total_amount = str_to_numeric_to_fixed(total_amount + ((v.price === '') ? "0": (v.qty * v.price)));
      row_amount = (Number(v.price) * Number(v.qty)).toFixed(2);
      total_amount = Number(Number(total_amount) + Number(row_amount)).toFixed(2);

      tds += "<tr><td><a href='#detail?" + v.id + "'>"+v.id+"</a></td>" +
             "<td><a href='#detail?" + v.id + "'><img src='"+v.links[0]+"' alt='"+v.name+"'></a></td>" +
             "<td><a href='#detail?" + v.id + "'>"+v.name+"</a></td>" +
             "<td>"+v.size+"</td>"+
             "<td><input type='number' value='"+v.qty+"' class='form-control cart_qty' min='1' data-idx='"+i+"'></td>" +
             "<td class='cart_price'>"+v.price+"</td><td>"+0.00+"</td><td class='cart_amount'>"+ row_amount +"</td><td><a href='#basket'><i class='fa fa-trash-o'></i></a></td>"+
             "<td class='hide'>"+v.line_item_id+"</td></tr>";

    });


    $('#js-basket-table-body').append(tds);
    $('#js-basket-table-amout__total').text(total_amount);

    $('#js-basket-table-amout__sale-result').text( (parseFloat(total_amount-kondakova.promo)).toFixed(2) );


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


    // $('.cart_qty').on('mouseout', function(e) {
    //   kondakova.cart[$(this).data('idx')].qty = Number( Number($(this).val()).toFixed(2));
    //   renderCartItems();
    // });

    // $('.cart_qty').on('mouseover', function(e) { return false; } );

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
      // },
      // messages: {
      //     user_name: "Please enter your firstname",
      //     user_email: "Please enter your lastname",
      //     user_phone: {
      //         required: "Please provide a password",
      //         minlength: "Your password must be at least 5 characters long"
      //     },
      //     user_email: "Please enter a valid email address",
      //     user_comment: "Please accept our policy"
      },
      errorClass: "text-danger",
      submitHandler: function(form) {
        //   form.submit();
           // console.warn(form);
        //$('#js-basket-btn-order-send').click();

        var formData = {
        'user_name'              : $('#user_name').val(),
        'user_email'             : $('#user_email').val(),
        'user_phone'             : $('#user_phone').val(),
        'user_comment'           : $('#user_comment').val(),
        'user_cart'              : kondakova.cart,
        'user_promo'             : kondakova.promo
        };

        // console.warn(formData);

        var d = $.ajax({
          type: "post",
          url: "test_email.php",
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

        d.done(function(){
          // console.log('dooooooone');
          $('#bs-example-modal-sm').modal('hide');
          cleanedBasket();
          $('#js-basket-alert').bs_success('Спасибо, Мы свяжемся с Вами в ближайшее время!');
          createAutoClosingAlert(".alert", 2500);
        });
    }
  });

  $('#js-basket-btn-order-send').on('click', function() {
    //alert("Спасибо, мы свяжемся с Вами в близжайшее время! \n p.s. Я не успел подключить отправку на почту. \n наверное нужно очищать корзину, да?");
    $("#basket-form").submit();
  });

}]);