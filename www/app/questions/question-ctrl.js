angular.module('bigFive').controller('QuestionCtrl', ['dataApi','$scope','CacheFactory', '$state', function (dataApi,$scope,CacheFactory,$state) {

  self.answerCache = CacheFactory.get('answerCache');

  $scope.counter = 1; // Declare counter that tracks what question the user is at
  var quest = null;
  var answer = [];

  $scope.choice = "0"; // Declare the value of the anser the User has chosen
  $scope.showPrev = false; // Declare the initial state of the Previous button = false
  $scope.showNext = true; // Declare the initial state of the Next button = true
  $scope.showSub = false; // Declare the initial state of the Submit button = false

  // function returns the value of the question the user is at
  function findQuestion() {
    dataApi.getData().then(function(data) {
      quest = _.chain(data)
                  .map()
                  .flatten()
                  .find({"id" : $scope.counter})
                  .value()

      $scope.swap = 'slideOutLeft'
      setTimeout(function() {
        $scope.question = quest.question;
        $scope.swap = 'slideInRight'
      }, 50);
      $scope.percentage = Math.round($scope.counter/50*100);
    });
  };

// initial call for the first question to be displayed
  findQuestion();

$scope.countTo = 50;
$scope.countfrom = 0;
// Radio button directives
$scope.next = function(choice) {
  var hash = {};
  if ($scope.counter<51) {

    hash["id"] = $scope.counter;
    hash["value"] = Number(choice);
    answer[($scope.counter-1)] = hash;
    if ($scope.counter <50) {
      $scope.counter++;
      if(answer[($scope.counter-1)]){
        $scope.choice = String(answer[($scope.counter-1)].value);
      }else {
        $scope.choice = "0";
      }

      changeClass($scope.choice);
      findQuestion();
    }
    if ($scope.counter === 50) {
      $scope.showNext = false;
      $scope.showSub = true;
    }
    $scope.showPrev = true;
    //console.log($scope.counter);
    //console.log(answer);
  }
}
//Previous button directives
$scope.previousButton = function() {
  if ($scope.counter>1) {
    $scope.counter--;
    if(answer[($scope.counter-1)]){
      $scope.choice = String(answer[($scope.counter-1)].value);
    }else {
      $scope.choice = "0";
    }
    console.log($scope.choice);
    changeClass($scope.choice);
    findQuestion();

    if ($scope.counter === 1) {
      $scope.showPrev = false;
    }
  }
  $scope.showNext = true;
  $scope.showSub = false;
}
// Next button directives
$scope.nextButton = function() {
  if (answer[($scope.counter-1)]) {
    if ($scope.counter<50) {
      $scope.counter++;
      if(answer[($scope.counter-1)]){
        $scope.choice = String(answer[($scope.counter-1)].value);
      }else {
        $scope.choice = "0";
      }
      changeClass($scope.choice);
      findQuestion();
      if ($scope.counter === 50) {
        changeClass($scope.choice);
        $scope.showNext = false;
        $scope.showSub = true;
      }
    }

    $scope.showPrev = true;
  }else {
    alert('You need to answer this question to move to the next one ');
  }
}

$scope.submitButton = function() {
  if(answer.length === 50){
    self.answerCache.put("Answer", answer);
    $state.go('result.results');
  }else {
    alert('you have not answered all questions, please check that all qeuestions have been answered')
  }

}

function changeClass(value) {

  $scope.class1 = 'notChecked';
  $scope.class2 = 'notChecked';
  $scope.class3 = 'notChecked';
  $scope.class4 = 'notChecked';
  $scope.class5 = 'notChecked';

setTimeout(function() {
  if (value == "1") {
    $scope.class1 = 'checked';
  }else if (value == "2") {
    $scope.class2 = 'checked';
  }else if (value == "3") {
    $scope.class3 = 'checked';
  }else if (value == "4") {
    $scope.class4 = 'checked';
  }else if (value == "5") {
    $scope.class5 = 'checked';
  }
}, 50)



}


//console.log($scope.choice);



}]);
