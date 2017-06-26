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
            $rootScope.loadingshow=false;
        });

        promise.success(function(data,status){
            if(data.code <= 0){
                alert("error! message : "+data.message);
            }else{



                $scope.datasNiiE=data.data.filter(function(ob){
                    return ob.brandCode == 'N' && ob.salesOwnerCode =='TRNT';
                });
                $scope.datasNiiS=data.data.filter(function(ob){
                    return ob.brandCode == 'N' && ob.salesOwnerCode =='SEYO';
                });
                $scope.datasCcE=data.data.filter(function(ob){
                    return ob.brandCode == 'K' && ob.salesOwnerCode =='TRNT';
                });
                $scope.datasCcS=data.data.filter(function(ob){
                    return ob.brandCode == 'K' && ob.salesOwnerCode =='SEYO';
                });



            }
            $rootScope.loadingshow=false;
        });
    }




    $scope.getWeeklyData();


    //계획 합계 함수
    $scope.planAmountSum=function(array){
        var total=0;
            for(var i=0;i<array.length;i++){
                total+=(array[i].planAmount==null ?0 :array[i].planAmount);
            }
        return total;
    }


});