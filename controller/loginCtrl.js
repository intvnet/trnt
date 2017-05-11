app.controller("loginCtrl",function($scope,$rootScope,$http,$state){
    $rootScope.loadingshow=false;

    $scope.login=function(user){
        var promise=$http({
            url:$rootScope.aipUrl+"/api/login",
            method:"POST",
            data:user
        });

        promise.error(function(data) {
            console.log(data);
        });
        promise.success(function(data) {
            console.log(data);
        });
    }


});

