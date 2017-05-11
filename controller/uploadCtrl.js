app.controller("uploadCtrl",function ($rootScope,$scope,$mdDialog){
    $rootScope.loadingshow=false;
    
    $scope.showAdvanced = function(ev) {

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'view/dialog/uploadForm.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false // Only for -xs, -sm breakpoints.
        })

    };


    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
});
