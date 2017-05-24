var app = angular.module("trntApp",["ngMaterial","ui.router","ngMessages"]);

app.run(function($rootScope){
    $rootScope.loadingshow=false;
    $rootScope.menuOn=false;
    $rootScope.aipUrl="http://10.20.12.14:8080";
    $rootScope.myDate=new Date();

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

    $urlRouterProvider.otherwise("/main");


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

    
    $stateProvider.state("main",{
        url:"/main",
        views:{
            headerView:{
                templateUrl:"view/header.html"
            },
            contentView:{
                templateUrl:"view/main.html",
                controller:"mainCtrl"
            },
            footerView:{
                templateUrl:"view/footer.html"
            },
            navView:{
                templateUrl:"view/nav.html"
            }
        }
    });
    
});

app.controller("htmlCtrl",function ($scope,$rootScope,$state,$mdDialog){
    $rootScope.loadingshow=false;


    $scope.menuToggle=function(){
        $rootScope.menuOn=!$rootScope.menuOn;
    }

    //업로드 창 열기
    $scope.showAdvanced = function(ev) {

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'view/dialog/uploadForm.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false // Only for -xs, -sm breakpoints.
        })

    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.upload = function() {
            //$mdDialog.hide(answer);
            //alert($state.current.name)
        };
    }

});



