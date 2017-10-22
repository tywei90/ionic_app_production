"use strict";

angular.module("ngTouchBases", [])
  .directive("ngTouchstart", function () {
    return {
      controller: function ($scope, $element, $attrs) {
        $element.bind('touchstart', onTouchStart);
        
        function onTouchStart(event) {
          var method = $element.attr('ng-touchstart');
          $scope.$event = event;
          $scope.$apply(method);
        };
      }
    };
  })
  .directive("ngTouchmove", function () {
    return {
      controller: function ($scope, $element, $attrs) {
        $element.bind('touchstart', onTouchStart);
        
        function onTouchStart(event) {
          event.preventDefault();
          $element.bind('touchmove', onTouchMove);
          $element.bind('touchend', onTouchEnd);
        };
        
        function onTouchMove(event) {
            var method = $element.attr('ng-touchmove');
            $scope.$event = event;
            $scope.$apply(method);
        };
        
        function onTouchEnd(event) {
          event.preventDefault();
          $element.unbind('touchmove', onTouchMove);
          $element.unbind('touchend', onTouchEnd);
        };
      }
    };
  })
  .directive("ngTouchend", function () {
    return {
      controller: function ($scope, $element, $attrs) {
        $element.bind('touchend', onTouchEnd);
        
        function onTouchEnd(event) {
          var method = $element.attr('ng-touchend');
          $scope.$event = event;
          $scope.$apply(method);
        };
      }
    };
  });