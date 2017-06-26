var app = angular.module("trntApp",["ngMaterial","ui.router","ngMessages","ngAnimate"]);

app.run(function($rootScope){
    $rootScope.loadingshow=false;
    $rootScope.menuOn=false;
    $rootScope.aipUrl="http://10.20.12.14:8080";

    //$rootScope.startDate=new Date(new Date() - 6 * 24 * 3600 * 1000);
    //$rootScope.endDate=new Date();

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


    $stateProvider.state("orderHistory",{
        url:"/orderHistory",
        views:{
            headerView:{
                templateUrl:"view/header.html"
            },
            contentView:{
                templateUrl:"view/orderHistory.html",
                controller:"orderHistoryCtrl"
            },
            footerView:{
                templateUrl:"view/footer.html"
            },
            navView:{
                templateUrl:"view/nav.html"
            }
        }
    });
    $stateProvider.state("buyingHistory",{
        url:"/buyingHistory",
        views:{
            headerView:{
                templateUrl:"view/header.html"
            },
            contentView:{
                templateUrl:"view/buyingHistory.html",
                controller:"buyingHistoryCtrl"
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

    $stateProvider.state("stockInventory",{
        url:"/stockInventory",
        views:{
            headerView:{
                templateUrl:"view/header.html"
            },
            contentView:{
                templateUrl:"view/stockInventory.html",
                controller:"stockInventoryCtrl"
            },
            footerView:{
                templateUrl:"view/footer.html"
            },
            navView:{
                templateUrl:"view/nav.html"
            }
        }
    });


    $stateProvider.state("performanceWeekly",{
        url:"/performanceWeekly",
        views:{
            headerView:{
                templateUrl:"view/header.html"
            },
            contentView:{
                templateUrl:"view/performanceWeekly.html",
                controller:"performanceWeeklyCtrl"
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

    $rootScope.checkStatus=function(status){
        if(status===401){
            alert("sesstion time out!");
            location.href="/login.html";
        }else{
            alert("error!");
        }
    }
});


//필터
app.filter("odTypeFilter",function(){
    return function(input){
        if(input=="E"){
            return "자체";
        }else if(input=="S"){
            return "위탁";
        }
    }
});

app.filter("bpTypeFilter",function(){
    return function(input){
        if(input=="P"){
            return "정상입고";
        }else if(input=="A"){
            return "추가입고";
        }
    }
});

//값이 없을때 0 반환하는 필터
app.filter("numberFilter",function(){
    return function(input){
        if(input==null){
            return "0";
        }else if(input !=null){
            return input;
        }
    }
});

