'use strict';

var routerApp = angular.module( 'routerApp', [ 'ui.router', 'ngTouch', 'page.nav.tabs', 'dropdown-multiselect' ] );

routerApp.config( function ( $stateProvider, $urlRouterProvider ) {

    $stateProvider

        .state( 'main', {
        url: '/main',
        templateUrl: 'main.html',
        controller: 'MainController'
    } )

    // HOME STATES AND NESTED VIEWS ========================================
    .state( 'main.home', {
        //url: '/',
        templateUrl: 'home.html',
        // controller: 'HomeController'
    } )

    .state( 'main.home.main', {
        url: '/home',
        templateUrl: 'partial-home.html',
        controller: 'HomeController'
    } )

    // nested list with custom controller
    .state( 'main.home.list', {
        url: '/home/list',
        templateUrl: 'partial-home-list.html',
        controller: 'listController'
    } )

    // nested list with just some random string data
    .state( 'main.home.paragraph', {
        url: '/home/paragraph',
        templateUrl: 'partial-home-paragraph.html',
        controller: 'ParagraphController'
    } )

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state( 'main.about', {
        url: '/about',
        views: {
            '': {
                templateUrl: 'partial-about.html',
                controller: 'AboutController'
            },
            'columnOne@main.about': {
                templateUrl: 'column.html'
            },
            'columnTwo@main.about': {
                templateUrl: 'table-data.html',
                controller: 'scotchController'
            }
        }

    } )

    .state( 'main.analytics', {
        url: '/analytics',
        templateUrl: 'analytics.html',
        controller: 'AnalyticsController'
    } );

    $urlRouterProvider.otherwise( '/main/home' );

} );

routerApp.run( [ "$rootScope", "$window", "$state", "$anchorScroll", function ( $rootScope, $window, $state, $anchorScroll ) {
    // $( "html, body" ).animate( {
    //     scrollTop: 0
    // }, 200 );

    // $rootScope.$on( '$stateChangeSuccess', function () {
    //     // $( "html, body" ).animate( {
    //     //     scrollTop: 0
    //     // }, 200 );
    //     $window.scrollTo(0, 0)
    //
    // } )
} ] );

routerApp.controller( 'MainController', function ( $scope, PageNavTabsService ) {
    //get tab name and bind to view
    $scope.navtabs = PageNavTabsService.getTabs();

    //nav location will always be named after the 1st index of navtabs name
    // $scope.navLocation = PageNavTabsService.getTabs()[1];
    $scope.$on( 'navLocation', function ( event, data ) {
        $scope.navLocation = data;
        console.log( data );
    } );

} );

routerApp.controller( 'HomeController', function ( $scope, PageNavTabsService ) {
    var tab = {
        1: 'Home'
    };
    //set tab name
    PageNavTabsService.setTab( tab );

    $scope.$emit( 'navLocation', 'Home' );

} );

routerApp.controller( 'ParagraphController', function ( $scope, PageNavTabsService ) {
    var tab = {
        2: 'Paragraph'
    };
    //set tab name
    PageNavTabsService.setTab( tab );

    $scope.$emit( 'navLocation', 'Home' );
} );

routerApp.controller( 'listController', function ( $scope, $state, PageNavTabsService ) {
    var tab = {
        2: 'List'
    };
    //set tab name
    PageNavTabsService.setTab( tab );

    $scope.state = $state.current.name;

    $scope.dogs = [ 'Bernese', 'Husky', 'Goldendoodle', 'Lab' ];

    $scope.fixtureTagData = {
        leftData: [ {
            'Area': '1',
            'Description': 'One Desk',
            'Qty': '14',
            'Location': 'Floor',
        }, {
            'Area': '2',
            'Description': 'Two Desk',
            'Qty': '30',
            'Location': 'Floor',
        }, {
            'Area': '4',
            'Description': 'Four Desk',
            'Qty': '40',
            'Location': ' Floor',
        } ],
        rightData: [ {
            'Area': '3',
            'Description': 'Three Desk',
            'Qty': '12',
            'Location': 'Stockroom',
        } ]
    };


    $scope.printArray = function ( arr ) {
        // console.log(arr);

        var area = [],
            tagQty = [],
            totalTagQty;

        for ( var i = 0; i < arr.length; i++ ) {
            area.push( parseInt( arr[ i ].Area ) );
            tagQty.push( parseInt( arr[ i ].Qty ) );
        }
        var areaLength = area.length;
        // console.log(area);
        // console.log(tagQty);

        if ( tagQty.length !== 0 ) {
            var totalTagQty = tagQty.reduce( function ( a, b ) {
                return a + b;
            } );
        } else {
            totalTagQty = 0;
        }

        // return totalTagQty;
        return '[' + area + ']';
    };

} );

routerApp.controller( 'AboutController', function ( $scope, PageNavTabsService ) {
    var tab = {
        1: 'About'
    };
    //set tab name
    PageNavTabsService.setTab( tab );

    // //get tab name and bind to view
    $scope.$emit( 'navLocation', 'About' );

} );

routerApp.controller( 'scotchController', function ( $scope, $state ) {

    $scope.state = $state.current.name;

    $scope.scotches = [ {
        name: 'Macallan 12',
        price: 50
    }, {
        name: 'Chivas Regal Royal Salute',
        price: 10000
    }, {
        name: 'Glenfiddich 1937',
        price: 20000
    } ];

} );

routerApp.controller( 'AnalyticsController', function ( $scope ) {

    $scope.options = [ {
        'Id': 1,
        'StoreDesc': 'DFDSDS',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 10,
        'StoreId': 8013
    }, {
        'Id': 2,
        'StoreDesc': 'TEST STORE',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 10,
        'StoreId': 8014
    }, {
        'Id': 3,
        'StoreDesc': 'NY OFF-SITE',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 10,
        'StoreId': 8101
    }, {
        'Id': 4,
        'StoreDesc': 'FL HOLD AND FLOW',
        'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 17,
        'StoreId': 8173
    }, {
        'Id': 5,
        'StoreDesc': 'SELL-OFF BA',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 17,
        'StoreId': 8174
    }, {
        'Id': 6,
        'StoreDesc': 'EATON CENTRE',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 15,
        'StoreId': 8356
    }, {
        'Id': 7,
        'StoreDesc': 'SHERWAY GARDENS',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 15,
        'StoreId': 8357
    }, {
        'Id': 8,
        'StoreDesc': 'NEW YORK',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 10,
        'StoreId': 8601
    }, {
        'Id': 9,
        'StoreDesc': 'BEVERLY HILLS',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 13,
        'StoreId': 8603
    }, {
        'Id': 10,
        'StoreDesc': 'TYSONS',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 10,
        'StoreId': 8604
    }, {
        'Id': 11,
        'StoreDesc': 'SANTA BARBARA MAIN',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 13,
        'StoreId': 8607
    }, {
        'Id': 12,
        'StoreDesc': 'NEW ORLEANS',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 12,
        'StoreId': 8608
    }, {
        'Id': 13,
        'StoreDesc': 'PALM BEACH GARDENS',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 12,
        'StoreId': 8610
    }, {
        'Id': 14,
        'StoreDesc': 'PALM DESERT',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 13,
        'StoreId': 8612
    }, {
        'Id': 15,
        'StoreDesc': 'BIRMINGHAM',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 12,
        'StoreId': 8613
    }, {
        'Id': 16,
        'StoreDesc': 'CINCINNATI',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 11,
        'StoreId': 8618
    }, {
        'Id': 17,
        'StoreDesc': 'SARASOTA 2',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 12,
        'StoreId': 8619
    }, {
        'Id': 18,
        'StoreDesc': 'CHICAGO',
        // 'ChainDesc': null,
        'ChainId': 8,
        'RegionId': 11,
        'StoreId': 8620
    } ];


    $scope.options = [];
    for (var i = 0; i < 100; i++) {
        var obj = {};
        obj.Id = i;
        obj.StoreDesc = 'New Store ' + i;
        obj.ChainId = 'Chain ' + i;
        obj.RegionId = 'Region ' + 0 + i;
        obj.StoreId = i;

        $scope.options.push(obj);
    }

    $scope.config = {
        options: $scope.options,
        trackBy: 'StoreId',
        displayBy: [ 'StoreId', 'StoreDesc' ],
        divider: ':',
        // icon: 'glyphicon glyphicon-heart',
        icon: 'fa fa-check-square-o',
        // displayBadge: false,
        filter: true,
        height: '200px',
        multiSelect: true,
        // preSelectAll: true
    };

$scope.selected = function(selectedItems){
    // console.log(selectedItems);
}


} );
