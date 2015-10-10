"use strict";

angular.module("page.nav.tabs", ["ngCookies"])
  .directive("pageNavTabs", [function() {
    return {
      restrict: "EA",
      templateUrl: "pageNavTabs/pageNavTabs.html",
      controller: "NavTabsController",
      scope: {
        navtabs: "=",
        location: "="
      },
      link: function(scope, element) {
        element.on("mouseenter", function() {
          element.css("cursor", "pointer");
        });
        element.on("mouseleave", function() {
          element.css("cursor", "initial");
        });
      }
    };
  }])

.factory("PageNavTabsService", ["$cookieStore", function($cookieStore) {

  var navtabs = $cookieStore.get("navtabs") || {},

    setTab = function(tabObj) {

      var idID = Object.getOwnPropertyNames(tabObj),
        id = parseInt(idID);

      try {
        if (isNaN(id)) {
          throw new TypeError("Expecting an object property to be an integer");
        }

        var navtabsKeys, navtabsLength, keyIndex;

        if (angular.isDefined(tabObj[id])) {
          navtabs[id] = tabObj[id];
          navtabsKeys = Object.keys(navtabs);
          navtabsLength = navtabsKeys.length;
          if (id === 1 && navtabsLength > 1) {
            var i, x;
            for (i = 1; i < navtabsLength; i++) {
              x = i + 1;
              delete navtabs[x];
            }
          } else {
            $cookieStore.put("navtabs", navtabs);
            keyIndex = navtabsKeys.indexOf(idID[0]);

            var keyKEY = keyIndex + 1;

            for (i = keyKEY; i < navtabsLength; i++) {
              x = i + 1;
              delete navtabs[x];
            }
          }
        }

        console.log(navtabs);
      } catch (e) {
        console.error(e.stack);
      }
    },

    getTabs = function() {
      return navtabs;
    },
    clearTabs = function() {
      $cookieStore.remove("navtabs");
    };

  return {
    setTab: setTab,
    getTabs: getTabs,
    clearTabs: clearTabs
  };
}]);
