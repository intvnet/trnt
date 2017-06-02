
app.controller("orderHistoryCtrl",["$scope","$rootScope","$http","$state",function($scope,$rootScope,$http,$state){
    //alert("차트 컨트롤러");
    $rootScope.menuOn=false;
    $scope.orderSearchOn=false;
    $scope.moreBtnShow=false;
    var listSize=50;
    var promise;
    var confirmDateValue;
    var paymentDateValue;


    
    
    //검색옵션 불러오기
    $scope.getChannelList=function(){

        $http({
            url:$rootScope.aipUrl+'/api/channel',
            method:'GET',
            withCredentials: true,
        }).error(function(data,status){
            $rootScope.checkStatus(status);
            alert("error!");
        }).success(function(data,status){
            $rootScope.checkStatus(status);
            if(data.code<=0){
                alert("error! message : "+data.message);
            }else{
                $scope.channelOptions=data.data;
            }
        });
    }
    $scope.getChannelList();
    
    //검색부분열기
    $scope.orderSearchToggle=function(){
        $scope.orderSearchOn = !$scope.orderSearchOn;
    }



    $scope.getOrderApi=function(){
        promise=$http({
            url:$rootScope.aipUrl+'/api/orderHistory',
            method:'GET',
            params:{"pageNum":$scope.pageNum,
            "paymentDate":paymentDateValue,
            "confirmDate":confirmDateValue,
            "channel":$scope.channel,
            "statusCode":$scope.statusCode,
            "channelOrderNo":$scope.channelOrderNo,
            "itemBarcode":$scope.itemBarcode
            },
            withCredentials: true,
        });
    }

    
    
    //데이터 가져오기

    $scope.getOrderList=function(){

        $rootScope.loadingshow=true;
        $scope.pageNum=1;

        $scope.getOrderApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            alert("error!");
        });
        promise.success(function(data,status){
            $rootScope.checkStatus(status);
            if(data.code <= 0){
                alert("error! message : "+data.message);
            }else{
                $scope.datas=data.data;
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }
            

        });

        $rootScope.loadingshow=false;
    }

    $scope.getOrderList();




    //검색하기
    $scope.searchOrder=function(){
        if($scope.paymentDate !=null){
            paymentDateValue=$scope.paymentDate.getFullYear()+"-"+(($scope.paymentDate.getMonth()+1)<10 ? '0'+($scope.paymentDate.getMonth()+1) : ($scope.paymentDate.getMonth()+1))+"-"+($scope.paymentDate.getDate()<10 ? '0'+$scope.paymentDate.getDate():$scope.paymentDate.getDate());
        }
        if($scope.confirmDate !=null){
            confirmDateValue=$scope.confirmDate.getFullYear()+"-"+(($scope.confirmDate.getMonth()+1)<10 ? '0'+($scope.confirmDate.getMonth()+1) : ($scope.confirmDate.getMonth()+1))+"-"+($scope.confirmDate.getDate()<10 ? '0'+$scope.confirmDate.getDate():$scope.confirmDate.getDate());
        }





        alert("결제일 : "+paymentDateValue+", 완료일 : "+confirmDateValue);


        $rootScope.loadingshow=true;
        $scope.pageNum=1;

        $scope.getOrderApi();

        $rootScope.loadingshow=false;

    }




    
    //더보기 버튼
    $scope.moreOrderList=function(){

        $rootScope.loadingshow=true;
        $scope.pageNum++;

        $scope.getOrderApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            alert("error!");
        });
        promise.success(function(data,status){
            $rootScope.checkStatus(status);
            if(data.code <= 0){
                alert("error! message : "+data.message);
            }else{
                for(var i=0;i<data.data.length;i++){
                    $scope.datas.push(data.data[i]);
                }
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }


        });

        $rootScope.loadingshow=false;

    }

}]);

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