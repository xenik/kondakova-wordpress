angular.module('app').controller('postsController', ['$scope', function($scope){

  $scope.fn = function(){
    // console.log(location.hash);
    // console.log(location.hash.substring(2,40));
    // console.log(location.hash.substring(2,40).replace('/','_'));
    $scope.loadFile(location.hash.substring(2,40).replace('/','_'));
  };

  $scope.test = function(a){
    // console.log(a);
    setTimeout($scope.fn,250);
  };

  // console.log("hello");

  $scope.loadFile = function(path){
    $.ajax('views/posts/'+path+'.html',{type: "GET",
      success: function(data) {
        // console.log(data);
        $('.container').eq(1).html(data);
      }
    })
  };


}]);