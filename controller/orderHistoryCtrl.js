
app.controller("orderHistoryCtrl",["$scope","$rootScope","$http","$state",function($scope,$rootScope,$http,$state){
    //alert("차트 컨트롤러");
    $rootScope.menuOn=false;
    $scope.orderSearchOn=false;
    $scope.moreBtnShow=false;
    var listSize=50;


    //검색부분열기
    $scope.orderSearchToggle=function(){
        $scope.orderSearchOn = !$scope.orderSearchOn;
    }
    
    //초반
    
    
    //데이터 가져오기

    $scope.getOrderList=function(){

        $rootScope.loadingshow=true;

        $http({
            url:$rootScope.aipUrl+'/api/orderHistory',
            method:'GET',
            params:{"pageNum":1},
            withCredentials: true,
        }).error(function(data,status){
            if(status===401){
                location.href="/login.html";
            }else{
                alert("error!");
            }
        }).success(function(data,status){
            if(status===401){
                location.href="/login.html";
            }


            $scope.datas=data.data;
            console.log(data.data);

        });

        $rootScope.loadingshow=false;
    }

    $scope.getOrderList();



}]);