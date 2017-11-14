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

myModule.controller("counterCtrl",['$scope','$timeout', function($scope,$timeout){

    //Adding initial value for counter
    //counter modelimiz için ilk değer atamasını yaptık.
    $scope.counterSec;
    $scope.counterMin;
    $scope.counting = false ;
    var stopped;

//timeout function
//1000 milliseconds = 1 second
//Every second counts
//Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.
    $scope.countdown = function() {
        stopped = $timeout(function() {
            if( $scope.counterSec > 0 ) {
                $scope.counterSec--;
                $scope.countdown();
            }
            else if ($scope.counterSec === 0){
                $scope.countdownMinute();
            }else console.log("ERROR ");
        }, 1000);
    };
    $scope.countdownMinute = function() {
        if($scope.counterMin > 0 ) {
            $scope.counterMin--;
            $scope.counterSec = 59;
            $scope.countdown();
        }else{
            alert("¡¡Se acabó el tiempo!!");
            $scope.counting=false;
        }
    };
    //Boton Detener
    $scope.stop = function(){
        $scope.counting = false;
        console.log("Stop");
        $timeout.cancel(stopped);
    };
    //Actualización del minutero y secundero
    $scope.updateTime = function(){
        if( $scope.counterSec >60) $scope.counterSec =59;
        else if($scope.counterSec === 60){
            $scope.counterSec = 0;
            $scope.counterMin += 1;
        }
        else if($scope.counterSec < 0){
            $scope.counterMin -= 1;
            $scope.counterSec = 59;
        }
    };
    // Boton Comenzar
    $scope.timeButtom = function(){
        $scope.counting = true;
        if($scope.counterSec === (null || undefined ))$scope.counterSec = 0;
        if($scope.counterMin === (null || undefined ))$scope.counterMin = 0;
        console.log($scope.counterMin+" : "+$scope.counterSec);
        $scope.countdown();
    }


}]);

myModule.controller("resultadosCtrl", function($scope,$http) {
    $scope.votos = {};
    $scope.formData = {};
    $scope.retorno = 0;

    $scope.resultados = function(){
        $http.post('/apiVotos/contarVotos', $scope.formData)
            .success(function(data) {
                $scope.votos.push(data[0]);
                $scope.formData = {};
                $scope.retorno = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});

