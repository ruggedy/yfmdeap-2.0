'use strict';

angular.module('bigFive').controller('HomePageCtrl', ['dataApi','$scope','CacheFactory','$state', '$ionicPopup', function(dataApi, $scope, CacheFactory, $state, $ionicPopup) {
    $scope.reveal = true;
    $scope.discover = "Discover";
    self.resultCache = CacheFactory.get('answerCache');

    var initRes = self.resultCache.get('Answer');


      if (initRes === undefined) {
        $scope.msg = "Start Test";
        $scope.reveal = true;
        $scope.discover = "Discover";
      }else {
        $scope.msg = "Retake Test";
        $scope.reveal = false;
        $scope.discover = "Re-discover";
      }

    $scope.resData = function() {
      if($scope.msg === "Retake Test") {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Redo Test',
          template: 'Are you sure you want to retake the test, doing this will delete your previous result'
        });
        confirmPopup.then(function(res) {
          if (res) {
            CacheFactory.clearAll();
            $state.go('question.questions');
          }
        });
      }else {
        $state.go('question.questions');
      }
    }


}])
