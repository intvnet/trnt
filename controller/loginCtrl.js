app.controller("loginCtrl",function($scope,$rootScope,$http,$state){
    $rootScope.loadingshow=false;

    $scope.login=function(user){
        console.log(user.userId+":"+user.password);

        var promise=$http({
            url:$rootScope.aipUrl+"/api/login",
            method:"GET",
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

