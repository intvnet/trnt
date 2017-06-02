app.controller("mainCtrl",function($scope,$rootScope,$http,$state){

    $rootScope.storageUserId=sessionStorage.getItem('userId');
    

    $rootScope.loadingshow=true;

    $http({
        url:$rootScope.aipUrl+'/api/test',
        method:'GET',
        withCredentials: true,
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
        
        $rootScope.loadingshow=false;
    });


    $scope.dateSubmit=function(myDate){
        console.log(myDate.toLocaleString());
    }
});

