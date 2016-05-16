'use strict';

angular.module('bigFive').controller('ResultFullDescCtrl', ['dataApi', '$scope', '$stateParams', 'CacheFactory', function(dataApi, $scope, $stateParams, CacheFactory) {
  var neededData = null;
  var rightData = null;
  var groupId = $stateParams.group;
  var dataId = Number($stateParams.id);

  self.resultCache = CacheFactory.get("resultCache");
  var resultData = self.resultCache.get("result");

  dataApi.getFullDescData().then(function(data) {

    neededData = _.chain(data[groupId])
                  .map()
                  .flatten()
                  .find({"id": dataId})
                  .value()

    //console.log(neededData);
    var str = neededData.fullMsg;
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
   $scope.message = str;

   console.log(str);

  });

  (function getRightData() {

    rightData = _.chain(resultData)
                 .map()
                 .flatten()
                 .find({"group": groupId})
                 .value()

    //console.log(rightData.image);
    $scope.image = rightData.image
  })();


}]);
