app.controller("buyingHistoryCtrl",["$scope","$rootScope","$http","$state",function($scope,$rootScope,$http,$state){
    //alert("리스트 컨트롤러");
    $rootScope.menuOn=false;
    $scope.moreBtnShow=false;
    var listSize=50;
    var startDateValue;
    var endDateValue;
    $scope.buyingSearchOn=false;
    var promise;




    $scope.getBuyingApi=function(){
        promise=$http({
            url:$rootScope.aipUrl+'/api/buyingHistory',
            method:'GET',
            params:{"pageNum":$scope.pageNum,"startDate":startDateValue,"endDate":endDateValue,"searchWord":$scope.searchWord},
            withCredentials: true,
        });
    }

    //리스트 가져오기
    $scope.getBuyingList =function(){
        $rootScope.loadingshow=true;
        $scope.pageNum=1;

        $scope.getBuyingApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            alert("error!");
            $rootScope.loadingshow=false;

        });
        promise.success(function(data,status) {
            $rootScope.checkStatus(status);

            if(data.code<=0){
                alert("error! message : "+data.message);
            }else{
                $scope.datas = data.data;
                $scope.totalCount=data.totalCount;
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }
            $rootScope.loadingshow=false;

        });




    }

    $scope.getBuyingList();
    
    
    //검색부분열기
    $scope.buyingSearchToggle=function(){
        $scope.buyingSearchOn = !$scope.buyingSearchOn;
    }
    

    
    //검색
    $scope.searchBuying=function(){


        if(($scope.startDate !=null && $scope.endDate==null) || ($scope.startDate ==null && $scope.endDate != null)){
            alert("검색일을 선택하여 주세요!");
            return false;
        }

        if($scope.startDate !=null && $scope.endDate !=null){
            startDateValue=$scope.startDate.getFullYear()+"-"+(($scope.startDate.getMonth()+1)<10 ? '0'+($scope.startDate.getMonth()+1) : ($scope.startDate.getMonth()+1))+"-"+($scope.startDate.getDate()<10 ? '0'+$scope.startDate.getDate():$scope.startDate.getDate());
            endDateValue=$scope.endDate.getFullYear()+"-"+(($scope.endDate.getMonth()+1)<10 ? '0'+($scope.endDate.getMonth()+1) : ($scope.endDate.getMonth()+1))+"-"+($scope.endDate.getDate()<10 ? '0'+$scope.endDate.getDate():$scope.endDate.getDate());
        }


        $rootScope.loadingshow=true;
        $scope.pageNum=1;

        $scope.getBuyingApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            alert("error!");
            $rootScope.loadingshow=false;
        });

        promise.success(function(data,status) {
            $rootScope.checkStatus(status);

            if(data.code<=0){
                alert("error! message : "+data.message);
            }else{
                $scope.datas = data.data;
                $scope.totalCount=data.totalCount;
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }
            $rootScope.loadingshow=false;

        });


    }


    $scope.moreGetList=function(){

        if(($scope.startDate !=null && $scope.endDate==null) || ($scope.startDate ==null && $scope.endDate != null)){
            alert("검색일을 선택하여 주세요!");
            return false;
        }

        if($scope.startDate !=null && $scope.endDate !=null){
            startDateValue=$scope.startDate.getFullYear()+"-"+(($scope.startDate.getMonth()+1)<10 ? '0'+($scope.startDate.getMonth()+1) : ($scope.startDate.getMonth()+1))+"-"+($scope.startDate.getDate()<10 ? '0'+$scope.startDate.getDate():$scope.startDate.getDate());
            endDateValue=$scope.endDate.getFullYear()+"-"+(($scope.endDate.getMonth()+1)<10 ? '0'+($scope.endDate.getMonth()+1) : ($scope.endDate.getMonth()+1))+"-"+($scope.endDate.getDate()<10 ? '0'+$scope.endDate.getDate():$scope.endDate.getDate());
        }

        $rootScope.loadingshow=true;
        $scope.pageNum++;

        $scope.getBuyingApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            alert("error!");
            $rootScope.loadingshow=false;
        });

        promise.success(function(data,status) {
            $rootScope.checkStatus(status);
            if(data.code<=0){
                alert("error!! code : "+data.code);
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


//필터
app.filter("bpTypeFilter",function(){
    return function(input){
        if(input=="P"){
            return "정상입고";
        }else if(input=="A"){
            return "추가입고";
        }
    }
});