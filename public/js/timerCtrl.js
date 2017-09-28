var myModule = angular.module("timerApp", [/* No Dependency Injection */]);
//Modulu olusturduk. Modul herhangi bir DI'ye ihtiyaç duymuyor


//timeout and scope are Angular's built-in services
//Adding injector
//Module timeout ve scope servislerini ekledik. Bunlar Anguların bizim için sağladığı yapısal servislerdir.
myModule.controller("counterCtrl",['$scope','$timeout', function($scope,$timeout){

    //Adding initial value for counter
    //counter modelimiz için ilk değer atamasını yaptık.
    $scope.counter;
    var stopped;

//timeout function
//1000 milliseconds = 1 second
//Every second counts
//Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.
    $scope.countdown = function() {
        stopped = $timeout(function() {
            console.log($scope.counter);
            $scope.counter--;
            $scope.countdown();
        }, 1000);
    };


    $scope.stop = function(){
        $timeout.cancel(stopped);

    }


}]);