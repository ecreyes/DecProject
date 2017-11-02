var myModule = angular.module("participanteApp", [/* No Dependency Injection */]);
//Modulu olusturduk. Modul herhangi bir DI'ye ihtiyaç duymuyor



myModule.controller("participanteCtrl", function($scope,$http) {
    $scope.participante = [];
    $scope.formData = {};
    $http.get('/apiParticipante/participantes')
        .success(function(data) {
            $scope.participante = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.crearParticipante = function(){
        $http.post('/apiParticipante/participantes', $scope.formData)
            .success(function(data) {
                $scope.participante.push(data[0]);
                $scope.formData = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

});

myModule.controller("votoCtrl", function($scope,$http) {
    $scope.decisiones = {};
    $scope.voto = {};
    $scope.participante = [];
    $scope.formData = {};

    $http.get('/apiParticipante/participantes')
        .success(function(data) {
            $scope.participante = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.get('/apiPanelAdmin/panelAdmin')
        .success(function (data) {
            console.log(data)
            $scope.decisiones = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    $http.get('/apiVotos/votos')
        .success(function (data) {
            console.log(data)
            $scope.voto= data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.crearVoto = function(){
        $http.post('/apiVotos/votos', $scope.formData)
            .success(function(data) {
                $scope.voto.push(data[0]);
                $scope.formData = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});

