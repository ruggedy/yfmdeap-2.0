
'use strict';

angular.module('bigFive').controller('ResultCtrl', ['dataApi','$scope', 'CacheFactory', function(dataApi, $scope, CacheFactory) {
  var data = null;
  var result = [];
  // a couple of arrays declared for each charateristic and their logic
  var addOpenIndex = [];
  var subOpenIndex = [];
  var addExtroIndex = [];
  var subExtroIndex = [];
  var addAgreeIndex = [];
  var subAgreeIndex = [];
  var addConsIndex = [];
  var subConsIndex = [];
  var addNueroIndex = [];
  var subNueroIndex = [];
  // result declaration
  var extroResult
  var openResult
  var agreeResult
  var consResult
  var neuroResult

  // grabbing data from cache and json file
  self.answerCache = CacheFactory.get("answerCache");
  self.resultCache = CacheFactory.get("resultCache");
  var ansData = self.answerCache.get("Answer");

  dataApi.getData().then(function(file) {
    data = file;
    //Crunching numbers to get the result
    for (var i = 0; i < ansData.length; i++) {
      if (data[i].group === "O" && data[i].symbol === "+") {

        addOpenIndex.push(ansData[i].value);
        var sumOpen = addOpenIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "O" && data[i].symbol === "-") {
        subOpenIndex.push(ansData[i].value);
        var subOpen = subOpenIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "E" && data[i].symbol === "+") {
        addExtroIndex.push(ansData[i].value);
        var sumExtro = addExtroIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "E" && data[i].symbol === "-") {
        subExtroIndex.push(ansData[i].value);
        var subExtro = subExtroIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "A" && data[i].symbol === "+") {
        addAgreeIndex.push(ansData[i].value);
        var sumAgree = addAgreeIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "A" && data[i].symbol === "-") {
        subAgreeIndex.push(ansData[i].value);
        var subAgree = subAgreeIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "N" && data[i].symbol === "+") {
        addNueroIndex.push(ansData[i].value);
        var sumNuero = addNueroIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "N" && data[i].symbol === "-") {
        subNueroIndex.push(ansData[i].value);
        var subNuero = subNueroIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "C" && data[i].symbol === "+") {
        addConsIndex.push(ansData[i].value);
        var sumCons = addConsIndex.reduce(function(a,b) {return a+b;}, 0);
      }
      else if (data[i].group === "C" && data[i].symbol === "-") {
        subConsIndex.push(ansData[i].value);
        var subCons = subConsIndex.reduce(function(a,b) {return a+b;}, 0);
      }
    }
     extroResult = Math.round((20+sumExtro-subExtro)/40*100);
     openResult = Math.round((8+sumOpen-subOpen)/40*100);
     agreeResult = Math.round((14+sumAgree-subAgree)/40*100);
     consResult = Math.round((14+sumCons-subCons)/40*100);
     neuroResult = Math.round((40-(38+sumNuero-subNuero))/40*100);

     resFunct();


     $scope.displayResult = result;
     console.log($scope.displayResult);
  });

  //function for putting all the results into a json file to be viewed in the page

  function resFunct() {
    for (var i = 0; i < 5; i++) {
      var hash = {};
      if (i === 0) {
        hash["group"] = "extraversion";
        hash["score"] = extroResult;
        if (extroResult <= 40) {
          hash["id"]  = 1;
          hash["msg"] = "Introvert";
          hash["image"]= "img/introvert.png";
        }else if (extroResult >= 60) {
          hash["id"]  = 2;
          hash["msg"] = "Extrovert";
          hash["image"]= "img/extrovert.png"
        }else if (extroResult > 40 && extroResult < 60) {
          hash["id"]  = 3;
          hash["msg"] = "balanced";
          hash["image"]= "img/balanced-extraversion.png"
        }
      }else if (i === 1) {
        hash["group"] = "openness";
        hash["score"] = openResult;
        if (openResult <= 40) {
          hash["id"]  = 1;
          hash["msg"] = "Analytical";
          hash["image"]= "img/analytical.png";
        }else if (openResult >= 60) {
          hash["id"]  = 2;
          hash["msg"] = "Creative";
          hash["image"]= "img/creative.png"
        }else if (openResult > 40 && openResult < 60) {
          hash["id"]  = 3;
          hash["msg"] = "balanced";
          hash["image"]= "img/balanced-openness.png"
        }
      }else if (i === 2) {
        hash["group"] = "agreeableness";
        hash["score"] = agreeResult;
        if (agreeResult <= 40) {
          hash["id"]  = 1;
          hash["msg"] = "Cooperator";
          hash["image"]= "img/cooperator.png";
        }else if (agreeResult >= 60) {
          hash["id"]  = 2;
          hash["msg"] = "Competitor";
          hash["image"]= "img/competitor.png"
        }else if (agreeResult > 40 && agreeResult < 60) {
          hash["id"]  = 3;
          hash["msg"] = "balanced";
          hash["image"]= "img/balanced-agreeableness.png"
        }
      }else if (i === 3) {
        hash["group"] = "conscientiousness";
        hash["score"] = consResult;
        if (consResult <= 40) {
          hash["id"]  = 1;
          hash["msg"] = "Planner";
          hash["image"]= "img/planner.png";
        }else if (consResult >= 60) {
          hash["id"]  = 2;
          hash["msg"] = "Improvisor";
          hash["image"]= "img/improvisor.png"
        }else if (consResult > 40 && consResult < 60) {
          hash["id"]  = 3;
          hash["msg"] = "balanced";
          hash["image"]= "img/balanced-conscientiousness.png"
        }
      }else if (i === 4) {
        hash["group"] = "neuroticism";
        hash["score"] = neuroResult;
        if (neuroResult <= 40) {
          hash["id"]  = 1;
          hash["msg"] = "Secure";
          hash["image"]= "img/secure.png";
        }else if (neuroResult >= 60) {
          hash["id"]  = 2;
          hash["msg"] = "Reactive";
          hash["image"]= "img/reactive.png"
        }else if (neuroResult > 40 && neuroResult < 60) {
          hash["id"]  = 3;
          hash["msg"] = "balanced";
          hash["image"]= "img/balanced-neuroticism.png"
        }
      }
      result[i] = hash;
    }
    self.resultCache.put('result', result);
  }
}]);
