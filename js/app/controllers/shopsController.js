angular.module('app').controller('shopsController', [function ()  {

//  $('#js-shop-products').empty();

  $.ajax({
    url: 'js/json/products.json',
    type: 'GET',
    dataType: 'json',
    data: ""
  }).done(function(data) {
//    console.log("success");
//    console.log(data);

    kondakova.products = data.category;

    var divs = '';

    $.each(kondakova.products, function(i,v) {

      if(v.name !== 'atelier') {
        // console.log(v);
        $.each(v.items, function(idx, val) {
          // console.log(val);
          divs += "<div class='col-md-4 col-sm-6'><div class='product'><div class='image'>" +
                  "<a href='#detail?" + val.id + "'><img src='" + val.link +
                  "' alt='product' class='img-responsive image1'></a>" +
                  "</div><div class='text'><h3>"+
                  "<a href='#detail?" + val.id + "' data-toggle='modal' data-target='#product-quick-view-modal'>" +
                  val.name + "</a></h3><p class='price'>" +
                  val.price + "</p></div></div></div>";
        });
      }

    });

      $('#js-shop-products').append(divs);


  }).fail(function() {
    console.error("Ошибка загрузки товаров");
  });
  // .always(function() {
  //   console.log("complete");
  // });


  $('#js-category-menu').on('click', function(event) {

  //  console.log($(event.target).parent().parent());
    console.log( $(event.target).data('category') );

    var category = $(event.target).data('category');

    $('#js-shop-products').empty();

    var divs = '';

    $.each(kondakova.products, function(i,v) {

      if(v.name == category) {

        if(category == 'atelier') {
          $.each(v.items, function(idx, val) {
            divs += "<div class='col-md-4 col-sm-6'><div class='product'><div class='image'>" +
                    "<a href='#detail?" + val.id + "'><img src='" + val.link +
                    "' alt='product' class='img-responsive image1'></a>" +
                    "</div><div class='text'><h3>"+
                    "<a href='#detail?" + val.id + "' data-toggle='modal' data-target='#product-quick-view-modal'>" +
                    val.name + "</a></h3><p class='price'>" +
                    'Индивидуальный пошив' + "</p></div></div></div>";
          });
        } else {
          $.each(v.items, function(idx, val) {
            divs += "<div class='col-md-4 col-sm-6'><div class='product'><div class='image'>" +
                    "<a href='#detail?" + val.id + "'><img src='" + val.link +
                    "' alt='product' class='img-responsive image1'></a>" +
                    "</div><div class='text'><h3>"+
                    "<a href='#detail?" + val.id + "' data-toggle='modal' data-target='#product-quick-view-modal'>" +
                    val.name + "</a></h3><p class='price'>" +
                    val.price + "</p></div></div></div>";
          });
        }
      } else if (category == 'all') {

        if(v.name !== 'atelier') {
          $.each(v.items, function(idx, val) {
            divs += "<div class='col-md-4 col-sm-6'><div class='product'><div class='image'>" +
                    "<a href='#detail?" + val.id + "'><img src='" + val.link +
                    "' alt='product' class='img-responsive image1'></a>" +
                    "</div><div class='text'><h3>"+
                    "<a href='#detail?" + val.id + "' data-toggle='modal' data-target='#product-quick-view-modal'>" +
                    val.name + "</a></h3><p class='price'>" +
                    val.price + "</p></div></div></div>";
          });
        }

      }

    });

      $('#js-shop-products').append(divs);
  });

}]);