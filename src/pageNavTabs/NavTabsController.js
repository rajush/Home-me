"use strict";

routerApp.controller("NavTabsController", ["$scope", "$state", function($scope, $state) {
  $scope.goto = function(tab, location) {
    var url,
      template = "main.";

    console.log("tab:", tab, "location:", location);

    // switch (location) {
    //
    //   case "Home":
    //     switch (tab) {
    //       case "Home":
    //         url = template + "home";
    //         break;
    //     }
    //     $state.go(url);
    // };
  }
}]);
