'use strict';

angular.module('bigFive').factory('dataApi', ['$http','$q', function($http, $q) {


  function getData() {
    var deffered = $q.defer();

    $http.get('app/data.json').success(function(data) {
      //console.log(data);
      deffered.resolve(data);
    })
    .error(function() {
      deffered.reject();
    });

    return deffered.promise;
  }

  function getFullDescData() {
    var deffered = $q.defer();

    $http.get('app/message.json').success(function(data) {
      deffered.resolve(data)
    })
    .error(function() {
      deffered.reject();
    })

    return deffered.promise;
  }

  return {
    getData: getData,
    getFullDescData: getFullDescData
  }
}]);
