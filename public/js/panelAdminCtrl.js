var app = angular.module("panelAdminApp",[]);

app.controller("panelAdminCtrl", function($scope,$http) {
    $scope.panelAdmins = {};
    $scope.formData = {};
    $http.get('/apiPanelAdmin/panelAdmin')
        .success(function(data) {
            console.log(data)
            $scope.panelAdmins = data;
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
});
