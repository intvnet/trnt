var app = angular.module("trntApp",["ngMaterial","ui.router"]);

app.run(function($rootScope){
    $rootScope.loadingshow=false;
    $rootScope.aipUrl="http://ba.trnt.kr";

});

app.directive('script', function() {
    return {
        restrict: 'E',
        scope: false,
        link: function(scope, elem, attr) {
            if (attr.type=='text/javascript-lazy') {
                var code = elem.text();
                var f = new Function(code);
                f();
            }
        }
    };
});

app.config(function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise("/chart");

    $stateProvider.state("chart",{
        url:"/chart",
        views:{
            headerView:{
                templateUrl:"view/header.html"
            },
            contentView:{
                templateUrl:"view/chart.html",
                controller:"chartCtrl"
            },
            footerView:{
                templateUrl:"view/footer.html"
            },
            navView:{
                templateUrl:"view/nav.html"
            }
        }
    });
    $stateProvider.state("list",{
        url:"/list",
        views:{
            headerView:{
                templateUrl:"view/header.html"
            },
            contentView:{
                templateUrl:"view/list.html",
                controller:"listCtrl"
            },
            footerView:{
                templateUrl:"view/footer.html"
            },
            navView:{
                templateUrl:"view/nav.html"
            }
        }
    });
    $stateProvider.state("upload",{
        url:"/upload",
        views:{
            headerView:{
                templateUrl:"view/header.html"
            },
            contentView:{
                templateUrl:"view/upload.html",
                controller:"uploadCtrl"
            },
            footerView:{
                templateUrl:"view/footer.html"
            },
            navView:{
                templateUrl:"view/nav.html"
            }
        }
    });
    $stateProvider.state("login",{
        url:"/login",
        views:{

            contentView:{
                templateUrl:"view/login.html",
                controller:"loginCtrl"
            },
            footerView:{
                templateUrl:"view/footer.html"
            }

        }
    });
    
});

app.controller("headerCtrl",function ($scope){

    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    }

});


