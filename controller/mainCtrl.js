app.controller("mainCtrl",function($scope,$rootScope,$http,$state){

    $rootScope.storageUserId=sessionStorage.getItem('userId');
    $scope.msg="메인";

    $rootScope.loadingshow=true;

    $http({
        url:$rootScope.aipUrl+'/api/test',
        method:'GET',

    }).error(function(data,status){
        if(status===401){
            $state.go("login");
        }
        console.log(data);
        alert("error!");
        $rootScope.loadingshow=false;
    }).success(function(data,status){
        if(status===401){
            $state.go("login");
        }
        console.log(data[0].BUYING_DATE);
        $rootScope.loadingshow=false;
    });
});

