var myModule = angular.module("timerApp", [/* No Dependency Injection */]);
//Modulu olusturduk. Modul herhangi bir DI'ye ihtiyaç duymuyor


//timeout and scope are Angular's built-in services
//Adding injector
//Module timeout ve scope servislerini ekledik. Bunlar Anguların bizim için sağladığı yapısal servislerdir.
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

// Email Controller

myModule.controller("escenarioCtrl", function($scope,$http) {
    $scope.escenario = [];
    $scope.formData = {};
    $http.get('/apiEscenario/escenarios')
        .success(function(data) {
            $scope.escenario = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.crearEscenario = function(){
        $http.post('/apiEscenario/escenarios', $scope.formData)
            .success(function(data) {
                $scope.escenario.push(data[0]);
                $scope.formData = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };


    $scope.correo = {};
    $scope.enviarCorreo = function(){
        $http.post('/sendemail', $scope.correo)
            .success(function(data) {
                alert("Correo enviado!");
                $scope.correo = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

});