var app = angular.module("panelAdminApp",[]);

app.controller("panelAdminCtrl", function($scope,$http) {
    $scope.formData = {};
    $http.get('/apiPanelAdmin/panelAdmin')
        .success(function(data) {
            $scope.panelAdmins = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.crearDecision = function(){
        $http.post('/apiPanelAdmin/panelAdmin', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});
