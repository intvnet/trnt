app.controller("uploadCtrl",function ($http,$scope,$rootScope,$state){
   //console.log($state.current.name);
    $scope.currentState=$state.current.name;
    $rootScope.uploadLoadingshow=false;
    //기본전송 URL test
    $scope.ajaxURL="/api/fileUpload/test";

    //주문내역 업로드할때 라이오 버튼 보이게
    if($state.current.name == "orderHistory"){
        $scope.uploadRadioShow=true;
        $scope.sourceType="e";
    }






//파일 업로드 하기
    $scope.goUploadFile=function(){
        $scope.uploadLoadingshow=true;

        //사입내역에서 업로드 할때
        if($state.current.name == "buyingHistory"){
            $scope.ajaxURL="/api/fileUpload/buyingHistory";
        }
        //주문내역에서 업로드 할때
        if($state.current.name == "orderHistory"){
            if($scope.sourceType=="e"){
                $scope.ajaxURL="/api/fileUpload/orderHistoryEcm";
            }else if($scope.sourceType=="s"){
                $scope.ajaxURL="/api/fileUpload/orderHistorySeyoung";
            }
        }
        //재고현황에서 업로드 할때
        if($state.current.name == "stockInventory"){
            $scope.ajaxURL="/api/fileUpload/stockInventory";
        }




        var uploadForm=document.getElementById('uploadForm');
        var formData=new FormData(uploadForm);

        var uploadFile=uploadForm.uploadFile.files[0];
        var fileName=uploadFile.name;



        if(fileName.lastIndexOf(".") != -1){
            var fileExt=fileName.substring(fileName.lastIndexOf(".")+1,fileName.length).toLowerCase();
            if(fileExt=="xlsx" || fileExt=="xls" || fileExt=="csv"){
                $http({
                    url:$rootScope.aipUrl+$scope.ajaxURL,
                    method:"POST",
                    headers: {'Content-Type':undefined},
                    transformRequest: angular.identity,
                    data:formData,
                    withCredentials: true
                }).success(function(data,status){
                    console.log(data);
                    if(data.code<=0){
                        alert("error! message : "+data.message);
                    }else{
                        alert("success!!");
                        $scope.hide();
                        $state.reload();
                    }
                    $scope.uploadLoadingshow=false;
                }).error(function(data,status){
                    alert("error!");
                    console.log(data);
                    $scope.uploadLoadingshow=false;
                });
            }else{
                alert("please insert xlsx,xls,csv file!!");
                $scope.uploadLoadingshow=false;
            }
        }else{
            alert("no ext!!");
            $scope.uploadLoadingshow=false;
        }


    }
});


