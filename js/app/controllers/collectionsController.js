angular.module('app').controller('collectionsController', [function(){

  var number_of_collection = location.hash.split('=')[1];

  if ( kondakova.collections == undefined ) {
    $('#collections').find('h3').text('Ого! Коллекция потерялась.. попробуйте открыть ее еще раз..');
  }


    var collection = kondakova.collections[number_of_collection], divs = '';

    $('#collections-content').empty();
    $('#collections').find('h3').text(collection.name);

    $.each(collection.images, function(index, val) {
      divs += "<div class='col-md-3 col-sm-4'><div class='product'><div class='image'>" +
              "<a href='#modal' data-toggle='modal' data-target='#product-quick-view-modal'>"+
              "<img src='" + val + "' alt='photo from collection' class='img-responsive image1'></a>" +
              "<div class='quick-view-button'>" +
              "<a href='' data-toggle='modal' data-target='#product-quick-view-modal' " +
              "class='btn btn-default btn-sm'>Открыть</a></div> </div></div></div>";
    });

// <div class="col-md-4 col-sm-6">
//   <div class="product">
//     <div class="image" style="height: 251px;">
//       <a href="detail.html">
//         <img src="img/product1.jpg" alt="" class="img-responsive image1">
//       </a>
//       <div class="quick-view-button">
//         <a href="#" data-toggle="modal" data-target="#product-quick-view-modal" class="btn btn-default btn-sm">Quick view</a>
//       </div>
//     </div>
//   </div>
// </div>



    $('#collections-content').append(divs);

  // productQuickViewGallery();//moved to  collectionsController
  // productDetailSizes();//moved to collectionsController
}]);