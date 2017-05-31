app.controller("buyingHistoryCtrl",["$scope","$rootScope","$http","$state",function($scope,$rootScope,$http,$state){
    //alert("리스트 컨트롤러");
    $scope.type="리스트";
    $rootScope.menuOn=false;
    $scope.moreBtnShow=false;
    var listSize=50;


    //리스트 가져오기
    $scope.getList =function(){
        $rootScope.loadingshow=true;

        $http({
            url:$rootScope.aipUrl+'/api/buyingHistory',
            method:'GET',
            params:{"pageNum":1},
            withCredentials: true,
        }).error(function(data,status){
            if(status===401){
                location.href="/login.html";
            }else{
                alert("error!");
            }

        }).success(function(data,status) {
            if(status===401){
                location.href="/login.html";
            }
            if(data.code == 1){
                $scope.datas = data.data;
                $scope.totalCount=data.totalCount;
                $scope.pageNum=data.pageNum;
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }else{
                alert("error!! code : "+data.code);
            }

        });

        $rootScope.loadingshow=false;


    }

    $scope.getList();


    $scope.searchBuying=function(){

        var startDateValue;
        var endDateValue;
        if($scope.startDate !=null){
            startDateValue=$scope.startDate.getFullYear()+"-"+(($scope.startDate.getMonth()+1)<10 ? '0'+($scope.startDate.getMonth()+1) : ($scope.startDate.getMonth()+1))+"-"+($scope.startDate.getDate()<10 ? '0'+$scope.startDate.getDate():$scope.startDate.getDate());
        }

        if($scope.endDate !=null){
            endDateValue=$scope.endDate.getFullYear()+"-"+(($scope.endDate.getMonth()+1)<10 ? '0'+($scope.endDate.getMonth()+1) : ($scope.endDate.getMonth()+1))+"-"+($scope.endDate.getDate()<10 ? '0'+$scope.endDate.getDate():$scope.endDate.getDate());
        }


        $rootScope.loadingshow=true;
        
        $http({
            url:$rootScope.aipUrl+'/api/buyingHistory',
            method:'GET',
            params:{"pageNum":1,"startDate":startDateValue,"endDate":endDateValue,"searchWord":$scope.searchWord},
            withCredentials: true,
        }).error(function(data,status){
            if(status===401){
                location.href="/login.html";
            }else{
                alert("error!");
            }

        }).success(function(data,status) {
            if(status===401){
                location.href="/login.html";
            }
            if(data.code == 1){
                $scope.datas = data.data;
                $scope.totalCount=data.totalCount;
                $scope.pageNum=data.pageNum;
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }else{
                alert("error!! code : "+data.code);
            }

        });

        $rootScope.loadingshow=false;
    }


    $scope.moreGetList=function(){

        var startDateValue;
        var endDateValue;
        if($scope.startDate !=null){
            startDateValue=$scope.startDate.getFullYear()+"-"+(($scope.startDate.getMonth()+1)<10 ? '0'+($scope.startDate.getMonth()+1) : ($scope.startDate.getMonth()+1))+"-"+($scope.startDate.getDate()<10 ? '0'+$scope.startDate.getDate():$scope.startDate.getDate());
        }

        if($scope.endDate !=null){
            endDateValue=$scope.endDate.getFullYear()+"-"+(($scope.endDate.getMonth()+1)<10 ? '0'+($scope.endDate.getMonth()+1) : ($scope.endDate.getMonth()+1))+"-"+($scope.endDate.getDate()<10 ? '0'+$scope.endDate.getDate():$scope.endDate.getDate());
        }

        $rootScope.loadingshow=true;

        $http({
            url:$rootScope.aipUrl+'/api/buyingHistory',
            method:'GET',
            params:{"pageNum":$scope.pageNum+1,"startDate":startDateValue,"endDate":endDateValue,"searchWord":$scope.searchWord},
            withCredentials: true,
        }).error(function(data,status){
            if(status===401){
                location.href="/login.html";
            }else{
                alert("error!");
            }

        }).success(function(data,status) {
            if(status===401){
                location.href="/login.html";
            }
            if(data.code == 1){
                for(var i=0;i<data.data.length;i++){
                    $scope.datas.push(data.data[i]);
                }
                $scope.pageNum=data.pageNum;
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }else{
                alert("error!! code : "+data.code);
            }

        });

        $rootScope.loadingshow=false;
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