angular.module('app').controller('collectionsController', [function(){

  var number_of_collection = location.hash.split('=')[1];

  if ( kondakova.collections == undefined ) {
    $('#collections').find('h3').text('Ого! Коллекция потерялась.. попробуйте открыть ее еще раз..');
  }


    var collection = kondakova.collections[number_of_collection], divs = '';


    // divs =     '<div class="modal fade" id="product-quick-view-modal" tabindex="-1" role="dialog" aria-hidden="false" style=""> \
    //   <div class="modal-dialog modal-lg"> \
    //     <div class="modal-content"> \
    //       <div class="modal-body"> \
    //         <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> \
    //         <div class="row quick-view product-main"> \
    //           <div class="col-sm-12"> \
    //             <div class="quick-view-main-image"> \
    //               <img src="img/detailbig1.jpg" alt="" class="img-responsive"> \
    //             </div> \
    //           </div> \
    //         </div> \
    //       </div> \
    //     </div> \
    //   </div> \
    // </div>';


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