app.controller("uploadCtrl",function ($http,$scope,$rootScope,$state){
   


//파일 업로드 하기
    $scope.goUploadFile=function(){
        var uploadForm=document.getElementById('uploadForm');
        var formData=new FormData(uploadForm);
        //formData.append("fileUpload",uploadForm.uploadFile.files[0]);
        console.log(uploadForm.uploadFile.files[0]);

        $http({
         url:$rootScope.aipUrl+"/api/fileUpload/test",
         method:"POST",
         headers: {'Content-Type':undefined},
         transformRequest: angular.identity,
         data:formData,
         withCredentials: true
         }).success(function(data,status){
            alert(status);
            console.log(data);
         }).error(function(data,status){
            alert("error");
            console.log(data)
         });

    }
});


