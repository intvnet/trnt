
app.controller("chartCtrl",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
    //alert("차트 컨트롤러");
    $scope.type="차트";
    $rootScope.menuOn=false;
    $rootScope.loadingshow=false;

    $scope.getChart=function(){

        //$rootScope.loadingshow=true;

        $scope.datas=[];
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
        promise.success(function(data,status){
            if(status===401){
                location.href="/login.html";
            }


            $scope.datas=data;


            function drawChart() {

                var insertData = new google.visualization.DataTable();
                insertData.addColumn('string', 'BUYING_UID');
                insertData.addColumn('number', 'RECEIVED_PRICE');
                insertData.addColumn('number', 'SHIPPED_PRICE');


                for(var i=0;i<20;i++){
                    insertData.addRow([data[i].BUYING_UID, data[i].RECEIVED_PRICE, data[i].SHIPPED_PRICE]);
                    //console.log(new Date(data[i].BUYING_DATE.substr(0,4),data[i].BUYING_DATE.substr(4,2),data[i].BUYING_DATE.substr(6,2)));
                }



                var options = {
                    'title':'사입데이터',
                    'width':1300,
                    'height':600,
                    hAxis: {
                        title:'BUYING_UID'
                    },
                    vAxis:{
                        title:'PRICE'
                    }
                };

                var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
                chart.draw(insertData, options);

            }

            google.charts.load('current', {'packages':['corechart','bar']});
            google.charts.setOnLoadCallback(drawChart);

        });
        $rootScope.loadingshow=false;
    }

    $scope.getChart();

}]);