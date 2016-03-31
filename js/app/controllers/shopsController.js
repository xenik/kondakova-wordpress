angular.module('app').controller('shopsController', [function ()  {

  $.ajax({
    url: 'js/json/products.json',
    type: 'GET',
    dataType: 'json',
    data: ""
  }).done(function(data) {

    kondakova.products = data.category;

    var divs = '';

    $.each(kondakova.products, function(i,v) {

      if(v.name !== 'atelier') {
        $.each(v.items, function(idx, val) {

          divs += "<div class='col-md-4 col-sm-6'><div class='product'><div class='image'>" +
                  "<a href='#detail?" + val.id + "'><img src='" + val.links[0] +
                  "' alt='product' class='img-responsive image1'></a></div>";

          if (val.sales_price) {
            divs += "<div class='ribbon sale'><div class='theribbon'>SALE</div><div class='ribbon-background'></div></div>";
          }

          divs += "<div class='text'><h3>"+
                  "<a href='#detail?" + val.id + "' data-toggle='modal' data-target='#product-quick-view-modal'>" +
                  val.name + "</a></h3>";

          if (val.sales_price) {
            divs += "<p class='price' style='color: #5091da;display: inline-block;'>"+numbersToMoneyView(val.sales_price)+"<i class='fa fa-rub'></i></p> "+
                    "<p class='price' style='text-decoration: line-through; display: inline-block;'>"+numbersToMoneyView(val.price)+"<i class='fa fa-rub'></i></p>";
          } else {
            divs += "<p class='price'>" +  numbersToMoneyView(val.price) + " <i class='fa fa-rub'></i></p>";
          }

          divs += "</div></div></div>";
        });
      }
    });

      $('#js-shop-products').append(divs);


  }).fail(function() {
    console.error("Ошибка загрузки товаров");
  });

  $('#js-category-menu').on('click', function(event) {

      var category = $(event.target).data('category');

    $('#js-shop-products').empty();

    var divs = '';

    $.each(kondakova.products, function(i,v) {

      if(v.name == category) {

        if(category == 'atelier') {
          $.each(v.items, function(idx, val) {
            divs += "<div class='col-md-4 col-sm-6'><div class='product'><div class='image'>" +
                    "<a href='#detail?" + val.id + ":atelier'><img src='" + val.links[0]  +
                    "' alt='product' class='img-responsive image1'></a>" +
                    "</div><div class='text'><h3>"+
                    "<a href='#detail?" + val.id + ":atelier' data-toggle='modal' data-target='#product-quick-view-modal'>" +
                    val.name + "</a></h3><p class='price'>" +
                    'Индивидуальный пошив' + "</p></div></div></div>";
          });
        } else {
          $.each(v.items, function(idx, val) {

              divs += "<div class='col-md-4 col-sm-6'><div class='product'><div class='image'>" +
                      "<a href='#detail?" + val.id + "'><img src='" + val.links[0] +
                      "' alt='product' class='img-responsive image1'></a></div>";

              if (val.sales_price) {
                divs += "<div class='ribbon sale'><div class='theribbon'>SALE</div><div class='ribbon-background'></div></div>";
              }

              divs += "<div class='text'><h3>"+
                      "<a href='#detail?" + val.id + "' data-toggle='modal' data-target='#product-quick-view-modal'>" +
                      val.name + "</a></h3>";

              if (val.sales_price) {
                divs += "<p class='price' style='color: #5091da;display: inline-block;'>"+numbersToMoneyView(val.sales_price)+"<i class='fa fa-rub'></i></p> "+
                        "<p class='price' style='text-decoration: line-through; display: inline-block;'>"+numbersToMoneyView(val.price)+"<i class='fa fa-rub'></i></p>";
              } else {
                divs += "<p class='price'>" +  numbersToMoneyView(val.price) + " <i class='fa fa-rub'></i></p>";
              }
              divs += "</div></div></div>";
          });
        }
      } else if (category == 'all') {

        if(v.name !== 'atelier') {
          $.each(v.items, function(idx, val) {

            divs += "<div class='col-md-4 col-sm-6'><div class='product'><div class='image'>" +
                    "<a href='#detail?" + val.id + "'><img src='" + val.links[0] +
                    "' alt='product' class='img-responsive image1'></a></div>";

            if (val.sales_price) {
              divs += "<div class='ribbon sale'><div class='theribbon'>SALE</div><div class='ribbon-background'></div></div>";
            }

            divs += "<div class='text'><h3>"+
                    "<a href='#detail?" + val.id + "' data-toggle='modal' data-target='#product-quick-view-modal'>" +
                    val.name + "</a></h3>";

            if (val.sales_price) {
              divs += "<p class='price' style='color: #5091da;display: inline-block;'>"+numbersToMoneyView(val.sales_price)+"<i class='fa fa-rub'></i></p> "+
                      "<p class='price' style='text-decoration: line-through; display: inline-block;'>"+numbersToMoneyView(val.price)+"<i class='fa fa-rub'></i></p>";
            } else {
              divs += "<p class='price'>" +  numbersToMoneyView(val.price) + " <i class='fa fa-rub'></i></p>";
            }

            divs += "</div></div></div>";
          });
        }
      }
    });
      $('#js-shop-products').append(divs);
  });
}]);