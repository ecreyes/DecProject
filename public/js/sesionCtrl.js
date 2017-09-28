var app = angular.module("sesionApp",[]);

app.controller("sesionCtrl", function($scope,$http) {
    $scope.formData = {};
    $http.get('/apiSesion/sesiones')
        .success(function(data) {
            $scope.sesions = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.crearSesion = function(){
        $http.post('/apiSesion/sesiones', $scope.formData)
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
