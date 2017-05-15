app.controller("loginCtrl",function($scope,$rootScope,$http,$state){
    $rootScope.loadingshow=false;

    $scope.login=function(user){
        //console.log(user.userId+":"+user.password);

        var promise=$http({
            url:$rootScope.aipUrl+"/api/login",
            method:"POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:$.param(user)
        });

        promise.error(function(data) {
            console.log(data);
            alert("error!");
        });
        promise.success(function(data) {
            console.log(data.code+":"+data.message);
            if(data.code===1){
                //alert(data.message);
                $state.go("main");
            }else{
                alert(data.message);
            }
        });
    }


});

