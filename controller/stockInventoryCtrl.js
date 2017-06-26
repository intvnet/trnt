app.controller("stockInventoryCtrl",function($scope,$rootScope,$state,$http){

    $rootScope.menuOn=false;
    $scope.stockSearchOn=true;
    $scope.moreBtnShow=true;
    var listSize=500;
    var promise;
    var endDateValue;
    var today=new Date().toLocaleDateString();

    //검색부분열기
    $scope.stockSearchToggle=function(){
        $scope.stockSearchOn = !$scope.stockSearchOn;
    }
    

    //검색옵션 불러오기
    $scope.getBrandList=function(){
        $http({
            url:$rootScope.aipUrl+'/api/code/BRCD',
            method:'GET',
            withCredentials: true,
        }).error(function(data,status){
            $rootScope.checkStatus(status);
        }).success(function(data,status){
            if(data.code<=0){
                alert("error! message : "+data.message);
            }else{
                $scope.brandOptions=data.data;
            }
        });
    }
    $scope.getBrandList();


    
    //Api 가져오기
    $scope.getStockApi=function(){
        promise=$http({
            url:$rootScope.aipUrl+'/api/inventory/report',
            method:'GET',
            params:{"pageNum":$scope.pageNum,
                "endDate":endDateValue,
                "searchWord":$scope.searchWord,
                "brand":$scope.brand,
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
            $rootScope.loadingshow=false;
        });
        promise.success(function(data,status){
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

    $scope.getStockList();





    //더보기
    $scope.moreGetList=function(){

        if($scope.endDate !=null){
            endDateValue=$scope.endDate.getFullYear()+"-"+(($scope.endDate.getMonth()+1)<10 ? '0'+($scope.endDate.getMonth()+1) : ($scope.endDate.getMonth()+1))+"-"+($scope.endDate.getDate()<10 ? '0'+$scope.endDate.getDate():$scope.endDate.getDate());
        }

        $rootScope.loadingshow=true;
        $scope.pageNum++;
        $scope.getStockApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            $rootScope.loadingshow=false;
        });
        promise.success(function(data,status){
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
        if($scope.endDate !=null){
            endDateValue=$scope.endDate.getFullYear()+"-"+(($scope.endDate.getMonth()+1)<10 ? '0'+($scope.endDate.getMonth()+1) : ($scope.endDate.getMonth()+1))+"-"+($scope.endDate.getDate()<10 ? '0'+$scope.endDate.getDate():$scope.endDate.getDate());
        }

        $rootScope.loadingshow=true;
        $scope.pageNum=1;
        $scope.getStockApi();

        promise.error(function(data,status){
            $rootScope.checkStatus(status);
            $rootScope.loadingshow=false;
        });
        promise.success(function(data,status){
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



    
    $scope.excel=function(){

        if($scope.endDate !=null){
            endDateValue=$scope.endDate.getFullYear()+"-"+(($scope.endDate.getMonth()+1)<10 ? '0'+($scope.endDate.getMonth()+1) : ($scope.endDate.getMonth()+1))+"-"+($scope.endDate.getDate()<10 ? '0'+$scope.endDate.getDate():$scope.endDate.getDate());
        }
        $rootScope.loadingshow=true;
        $http({
            url:$rootScope.aipUrl+'/api/inventory/report',
            method:'GET',
            params:{"pageNum":1,
                "endDate":endDateValue,
                "searchWord":$scope.searchWord,
                "brand":$scope.brand,
                "listSize":$scope.totalCount
            },
            withCredentials:true
        }).success(function(data,status){
            if(data.code <= 0){
                alert("error! message : "+data.message);
            }else{
                var csvData=[];
                var datas=data.data;
                for(var i=0;i<datas.length;i++){
                    csvData.push({"기준일":datas[i].confirmDate,
                        "브랜드":datas[i].brandCodeTitle,
                        "상품코드":datas[i].itemBarcode,
                        "사입수량":datas[i].receivedQty,
                        "출고수량":datas[i].orderOutQty==null?0:datas[i].orderOutQty,
                        "손망실수량":0,
                        "입고수량":datas[i].orderInQty==null?0:datas[i].orderInQty,
                        "재고수량(장부)":(datas[i].receivedQty=null?0:datas[i].receivedQty)-(datas[i].orderOutQty==null?0:datas[i].orderOutQty)+(datas[i].orderInQty==null?0:datas[i].orderInQty),
                        "재고수량(세영)":datas[i].totalQty==null?0:datas[i].totalQty,
                        "재고차이":(datas[i].receivedQty==null?0:datas[i].receivedQty)-(datas[i].orderOutQty==null?0:datas[i].orderOutQty)+(datas[i].orderInQty==null?0:datas[i].orderInQty)-(datas[i].totalQty==null?0:datas[i].totalQty),
                        "가용재고":datas[i].availableQty==null?0:datas[i].availableQty
                    });
                }

                JSONToCSVConvertor(csvData,today+"(재고현황)",true);
            }
            $rootScope.loadingshow=false;
        }).error(function(data,status){
            $rootScope.checkStatus(status);
            $rootScope.loadingshow=false;
        });




    }


});


