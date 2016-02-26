angular.module('app').controller('collectionsController', [function(){

  var number_of_collection = location.hash.split('=')[1];

  if ( kondakova.collections == undefined ) { alert("произошла ошибка - перезагрузите сайт");}


    var collection = kondakova.collections[number_of_collection], divs = '';

    $('#collections-content').empty();
    $('#collections').find('h3').text(collection.name);

    $.each(collection.images, function(index, val) {
      divs += "<div class='col-md-3 col-sm-4'><div class='product'><div class='image'>" +
              "<img src='" + val + "' alt='photo from collection' class='img-responsive image1'></div></div></div>";
    });

    $('#collections-content').append(divs);



}]);