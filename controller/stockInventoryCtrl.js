app.controller("stockInventoryCtrl",function($scope,$rootScope,$state,$http){

    $rootScope.menuOn=false;
    $scope.stockSearchOn=false;
    $scope.moreBtnShow=true;
    var listSize=500;
    var promise;
    var endDateValue;


    //검색부분열기
    $scope.stockSearchToggle=function(){
        $scope.stockSearchOn = !$scope.stockSearchOn;
    }
    
    
    
    //Api 가져오기
    $scope.getStockApi=function(){
        promise=$http({
            url:$rootScope.aipUrl+'/api/inventory/report',
            method:'GET',
            params:{"pageNum":$scope.pageNum,
                "endDate":endDateValue,
                "searchWord":$scope.searchWord,
                "listSize":listSize
            },
            withCredentials:true
        });
    }

    $scope.getStockList=function(){

        $rootScope.loadingshow=true;
        $scope.pageNum=1;
        $scope.getStockApi();

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
                console.log(data.data[0].brandCodeTitle);
                if(data.pageNum*listSize < data.totalCount){
                    $scope.moreBtnShow=true;
                }
            }
            $rootScope.loadingshow=false;

        });



    }

    $scope.getStockList();





    //더보기
    $scope.moreGetList=function(){


        $rootScope.loadingshow=true;
        $scope.pageNum++;
        $scope.getStockApi();

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


    $scope.searchStock=function(){

    }

});


//필터
app.filter("numberFilter",function(){
    return function(input){
        if(input==null){
            return "0";
        }else if(input !=null){
            return input;
        }
    }
});