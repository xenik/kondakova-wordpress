angular.module('app').controller('collectionsController', [function(){

  // if ( kondakova.collections == undefined ) {
  //   console.log('kondakova.collections == undefined');
  //   $('#collections').find('h3').text('Ого! Коллекция потерялась.. попробуйте открыть ее еще раз..');
  // } else {

    var number_of_collection = location.hash.split('=')[1];

    if (number_of_collection == undefined) { location.hash = '/'; }

    var collection = kondakova.collections[number_of_collection], divs = '';

    $('#collections-content').empty();
    $('#collections').find('h3').text(collection.name);

    $.each(collection.images, function(index, val) {
      divs  +=  "<div class='col-md-3 col-sm-4'>" +
                  "<div class='product'>" +
                    "<div class='image'>" +
                      "<a href='' data-toggle='modal' data-target='#product-quick-view-modal' onclick='return false;'>"+
                         "<img src='" + val + "' alt='photo from collection' class='img-responsive image1'>"+
                      "</a>" +
                      "<div class='quick-view-button'>" +
                        "<a href='' data-toggle='modal' data-target='#product-quick-view-modal' " +
                        "class='btn btn-default btn-sm' onclick='return false;'>Открыть</a>"+
                      "</div>"+
                    "</div>"+
                  "</div>"+
                "</div>";
    });

    $('#collections-content').append(divs);
//  }
}]);