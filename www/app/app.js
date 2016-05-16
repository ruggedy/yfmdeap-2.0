angular.module('bigFive', ['ionic', 'ngSanitize', 'ngAnimate', 'ui.bootstrap', 'angular-cache'])
.run(function($ionicPlatform, CacheFactory) {
  $ionicPlatform.ready(function() {

    CacheFactory('answerCache', {storageMode:"localStorage"});
    CacheFactory('resultCache', {storageMode:"localStorage"});

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
  // setup an abstract state for the tabs directive
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'app/home/home.html'
  })

  // Each home has its own nav history stack:

  .state('home.home', {
    url: '/homepage',
    views: {
      'tab-home': {
        templateUrl: 'app/home/homePage.html'
      }
    }
  })
  .state('home.about', {
      url: '/aboutpage',
      views: {
        'tab-about': {
          templateUrl: 'app/home/aboutPage.html'
        }
      }
    })
  .state('question', {
      abstract: true,
      url: '/question',
      templateUrl:'app/questions/question-layout.html'
    })
  .state('question.questions', {
      url: '/questions',
      views: {
        'mainContent': {
          templateUrl: 'app/questions/question.html'
        }
      }
    })
  .state('result', {
      abstract: true,
      url: '/answer',
      templateUrl: 'app/Result/results-layout.html'
    })
  .state('result.results', {
      url: '/results',
      views: {
        'resultContent': {
          templateUrl: 'app/Result/result.html'
        }
      }
    })
  .state('result.ansFullDesc', {
      url: '/results/:group/:id',
      views: {
        'resultContent': {
          templateUrl: 'app/Result/resultFullDesc.html'
        }
      }
    });

  // some global options set
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.tabs.position('bottom');
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/aboutpage');

});
