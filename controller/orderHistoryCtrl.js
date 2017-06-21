
app.controller("orderHistoryCtrl",["$scope","$rootScope","$http","$state",function($scope,$rootScope,$http,$state){
    //alert("차트 컨트롤러");
    $rootScope.menuOn=false;
    $scope.orderSearchOn=true;
    $scope.moreBtnShow=false;
    var listSize=50;
    var promise;
    var endDateValue;
    var startDateValue;


    
    
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
    $scope.getStatusCodeList=function(){

        $http({
            url:$rootScope.aipUrl+'/api/code/ORST',
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
                $scope.statusCodeOptions=data.data;
            }
        });
    }
    $scope.getChannelList();
    $scope.getStatusCodeList();

    
    //검색부분열기
    $scope.orderSearchToggle=function(){
        $scope.orderSearchOn = !$scope.orderSearchOn;
    }



    $scope.getOrderApi=function(){
        promise=$http({
            url:$rootScope.aipUrl+'/api/orderHistory',
            method:'GET',
            params:{"pageNum":$scope.pageNum,
            "dateType":$scope.dateType,
            "startDate":startDateValue,
            "endDate":endDateValue,
            "channel":$scope.channel,
            "statusCode":$scope.statusCode,
            "searchWordType":$scope.searchWordType,
            "searchWord":$scope.searchWord
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
            $rootScope.loadingshow=false;
        });
        promise.success(function(data,status){
            $rootScope.checkStatus(status);
            if(data.code <= 0){
                alert("error! message : "+data.message);
            }else{
                $scope.datas=data.data;
                $scope.totalCount=data.totalCount;
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }
            $rootScope.loadingshow=false;

        });


    }

    $scope.getOrderList();




    //검색하기
    $scope.searchOrder=function(){

        if(($scope.startDate !=null && $scope.endDate==null) || ($scope.startDate ==null && $scope.endDate != null)){
            alert("검색일을 선택하여 주세요!");
            return false;
        }



        if($scope.startDate !=null && $scope.endDate !=null){
            if($scope.dateType == null){
                alert("날짜검색 기준을 선택하여 주세요!");
                return false;
            }else{
                startDateValue=$scope.startDate.getFullYear()+"-"+(($scope.startDate.getMonth()+1)<10 ? '0'+($scope.startDate.getMonth()+1) : ($scope.startDate.getMonth()+1))+"-"+($scope.startDate.getDate()<10 ? '0'+$scope.startDate.getDate():$scope.startDate.getDate());
                endDateValue=$scope.endDate.getFullYear()+"-"+(($scope.endDate.getMonth()+1)<10 ? '0'+($scope.endDate.getMonth()+1) : ($scope.endDate.getMonth()+1))+"-"+($scope.endDate.getDate()<10 ? '0'+$scope.endDate.getDate():$scope.endDate.getDate());
            }
        }


        if($scope.searchWord != null && $scope.searchWordType == null){
            alert("검색어의 기준을 선택하여 주세요!");
            return false;
        }



       


        $rootScope.loadingshow=true;
        $scope.pageNum=1;

        $scope.getOrderApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            alert("error!");
            $rootScope.loadingshow=false;
        });
        promise.success(function(data,status){
            $rootScope.checkStatus(status);
            if(data.code <= 0){
                alert("error! message : "+data.message);
            }else{
                $scope.datas=data.data;
                $scope.totalCount=data.totalCount;
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }
            $rootScope.loadingshow=false;

        });




    }




    
    //더보기 버튼
    $scope.moreOrderList=function(){

        $rootScope.loadingshow=true;
        $scope.pageNum++;

        $scope.getOrderApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            alert("error!");
            $rootScope.loadingshow=false;
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
                }else{
                    $scope.moreBtnShow=false;
                }
            }
            $rootScope.loadingshow=false;

        });



    }

}]);

