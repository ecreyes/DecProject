var app = angular.module("panelAdminApp",[]);

app.controller("panelAdminCtrl", function($scope,$http) {
    $scope.panelAdmins = {};
    $scope.formData = {};
    $scope.panelAdmins2 = {};
    $scope.formData2 = {};

    $http.get('/apiPanelAdmin/panelAdmin')
        .success(function(data) {
            console.log(data)
            $scope.panelAdmins = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $http.get('/apiPanelAdmin/panelAdmin2')
        .success(function(data) {
            console.log(data)
            $scope.panelAdmins2 = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.crearDecision = function(){
        $http.post('/apiPanelAdmin/panelAdmin',$scope.formData)
            .success(function(data) {
                $scope.panelAdmins.push(data[0]);
                $scope.formData = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    $scope.crearAdmin = function(){
        $http.post('/apiPanelAdmin/panelAdmin2',$scope.formData2)
            .success(function(data) {
                $scope.panelAdmins2.push(data[0]);
                $scope.formData2 = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

});
