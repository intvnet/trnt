
app.controller("orderHistoryCtrl",["$scope","$rootScope","$http","$state",function($scope,$rootScope,$http,$state){
    //alert("차트 컨트롤러");
    $scope.type="차트";
    $rootScope.menuOn=false;
    console.log(window.document.URL);


    $scope.getChart=function(selectPage){

        if(selectPage==null){alert(1)}else{alert(2)}

        $rootScope.loadingshow=true;

        $scope.datas=[];
        var promise=$http({
            url:$rootScope.aipUrl+'/api/buyingHistory',
            method:'GET',
            params:{"pageNum":2},
            withCredentials: true,
        });

        promise.error(function(data,status){
            if(status===401){
                location.href="/login.html";
            }else{
                alert("error!");
            }
        });
        promise.success(function(data,status){
            if(status===401){
                location.href="/login.html";
            }


            $scope.datas=data.data;

            
            //데이터 길이
            //console.log(data.length);
            //1페이지에 출력할 게시물 갯수
            var listSize=50;
            //페이지 출력 갯수
            var boxSize=10;
            //현재 선택되어 보여지는 페이지의 번호
            var currentPage=data.pageNum;
            //총 게시물의 갯수
            var total=data.totalCount;
            //총 페이지의 갯수
            var totalPage=Math.ceil(total/listSize);
            //총 페이지의 장수
            var totalPageBox=Math.ceil(totalPage/boxSize);
            //현재 페이지의 장수
            var currentPageBox=Math.ceil(currentPage/boxSize);
            //현재 페이지의 장수에서 페이지 박스에 들어올 첫번째 페이지
            var firstPage=((currentPageBox-1)*10)+1;

            //console.log(totalPageBox);

            for(var i=firstPage;i<firstPage+10;i++){
                $("#paging_wrap").append("<button ng-click='getChart("+i+")'>"+i+"</button>");
            }



        });
        $rootScope.loadingshow=false;
    }

    $scope.getChart();



}]);