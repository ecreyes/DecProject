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
            console.log($scope.counterSec);
            if( $scope.counterSec > 0 ) {
                $scope.counterSec--;
                $scope.countdown();
            }
            else if ($scope.counterSec === 0){
                $scope.countdownMinute();
            }
        }, 1000);
    };
    $scope.countdownMinute = function() {
        if($scope.counterMin > 0 ) {
            $scope.counterMin--;
            $scope.counterSec = 59;
            $scope.countdown();
        }

    };

    $scope.stop = function(){
        $scope.counting = false;
        $timeout.cancel(stopped);
    }

    $scope.timeButtom = function(){
        $scope.counting = true;
        $scope.countdown();
    }


}]);

myModule.controller("objetivoCtrl", function($scope,$http) {
    $scope.formData = {};
    $http.get('/apiObjetivo/objetivos')
        .success(function(data) {
            $scope.sesions = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.crearObjetivo = function(){
        $http.post('/apiObjetivo/objetivos', $scope.formData)
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