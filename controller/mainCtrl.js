app.controller("mainCtrl",function($scope,$rootScope,$http,$state){

    $rootScope.storageUserId=sessionStorage.getItem('userId');
    $scope.msg="메인";

    $rootScope.loadingshow=true;

    $http({
        url:$rootScope.aipUrl+'/api/test',
        method:'GET',

    }).error(function(data,status){
        console.log(status);
        if(status===401){
            location.href="/login.html";
        }else{
            alert("error!");
        }
        $rootScope.loadingshow=false;
    }).success(function(data,status){
        console.log(status);
        if(status===401){
            location.href="/login.html";
        }
        console.log(data[0].BUYING_DATE);
        $rootScope.loadingshow=false;
    });


    $scope.dateSubmit=function(myDate){
        console.log(myDate.toLocaleString());
    }
});

