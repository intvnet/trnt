app.controller("uploadCtrl",function ($http,$scope,$rootScope,$state){
   


//파일 업로드 하기
    $scope.goUploadFile=function(){
        var uploadForm=document.getElementById('uploadForm');
        var formData=new FormData(uploadForm);
        //formData.append("fileUpload",uploadForm.uploadFile.files[0]);
        var uploadFile=uploadForm.uploadFile.files[0];
        var fileName=uploadFile.name;

        //console.log(fileName.length);
        //console.log("라스트인덱스"+fileName.lastIndexOf("."));


        if(fileName.lastIndexOf(".") != -1){
            var fileExt=fileName.substring(fileName.lastIndexOf(".")+1,fileName.length).toLowerCase();
            if(fileExt=="xlsx" || fileExt=="xls" || fileExt=="csv"){
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
            }else{
                alert("please insert xlsx,xls,csv file!!");
            }
        }else{
            alert("no ext!!");
        }





    }
});


