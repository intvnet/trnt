app.controller("buyingHistoryCtrl",["$scope","$rootScope","$http","$state",function($scope,$rootScope,$http,$state){
    //alert("리스트 컨트롤러");
    $scope.type="리스트";
    $rootScope.menuOn=false;
    


    //리스트 가져오기
    $scope.getList =function(){
        $rootScope.loadingshow=true;



        //$scope.datas=[];
        var promise=$http({
            url:$rootScope.aipUrl+'/api/test',
            method:'GET',
            withCredentials: true,
        });

        promise.error(function(data,status){
            if(status===401){
                location.href="/login.html";
            }else{
                alert("error!");
            }
        });
        promise.success(function(data,status) {
            if(status===401){
                location.href="/login.html";
            }

            $scope.datas = data;
/*
            //표 그리기
            function drawTable() {
                var insertData = new google.visualization.DataTable();
                insertData.addColumn('date', 'BUYING_DATE');
                insertData.addColumn('string', 'BUYING_CODE');
                insertData.addColumn('number', 'SHIPPED_QTY');
                insertData.addColumn('number', 'RECEIVED_PRICE');
                insertData.addColumn('number', 'RECEIVIED_QTY');
                insertData.addColumn('string', 'ITEM_CODE');
                insertData.addColumn('string', 'BUYING_UID');
                insertData.addColumn('number', 'SHIPPED_PRICE');


                //for(var i=0;i<data.length;i++){
                for(var i=0;i<100;i++){
                    insertData.addRow([
                        {v:new Date(data[i].BUYING_DATE.substr(0,4),data[i].BUYING_DATE.substr(4,2),data[i].BUYING_DATE.substr(6,2)),f:data[i].BUYING_DATE},
                        data[i].BUYING_CODE,
                        data[i].SHIPPED_QTY,
                        data[i].RECEIVED_PRICE,
                        data[i].RECEIVIED_QTY,
                        data[i].ITEM_CODE,
                        data[i].BUYING_UID,
                        data[i].SHIPPED_PRICE

                    ]);
                }


                var table = new google.visualization.Table(document.getElementById('table_div'));

                var option={
                    showRowNumber: true,
                    width:'1300px',
                    height:'100%'
                }

                table.draw(insertData, option);
            }

            google.charts.load('current', {'packages':['table']});
            google.charts.setOnLoadCallback(drawTable);
*/
        });
        $rootScope.loadingshow=false;
    }

    $scope.getList();
    
    





}]);