app.controller("performanceWeeklyCtrl",function($scope,$rootScope,$http){
    $rootScope.menuOn=false;
    var promise;

    $scope.year='2017';
    $scope.week='22';

    //API가져오기
    $scope.getWeeklyApi=function(){
        promise=$http({
            url:$rootScope.aipUrl+'/api/performance/weekly',
            method:'GET',
            params:{week:$scope.week,year:$scope.year},
            withCredentials: true
        });
    }
    
    //데이터 가져오기
    $scope.getWeeklyData=function(){
        $rootScope.loadingshow=true;
        $scope.getWeeklyApi();

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
                console.log($scope.datas);
            }
            $rootScope.loadingshow=false;
        });
    }

    $scope.getWeeklyData();

});