/**
 * Created by SIB on 4/23/2016.
 */

angular.module('myApp', ["googlechart"])
    .controller('watsonController', function ($scope, $http) {


        var url = 'http://localhost:8080/watson';
        //var url = 'https://gateway.watsonplatform.net/tone-analyzer-beta/api/v3/tone?version=2016-02-11&tones=emotion';
        //$http.defaults.headers.common['Authorization'] = 'Basic NjYxZjYyOGEtMjYxNS00NzY0LWI0MTUtM2U5NzI0NGU5ODA0OjZBalpYREljck83Sw==';

        $scope.myEmotionObject = {};
        $scope.myEmotionObject.type = "Gauge";

        $scope.myEmotionObject.options = {
            width: 500,
            height: 150,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 10,
            fontSize : 50
        };

        $scope.myWritingObject = {};
        $scope.myWritingObject.type = "Gauge";

        $scope.myWritingObject.options = {
            width: 300,
            height: 150,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 10
        };

        $scope.mySocialObject = {};
        $scope.mySocialObject.type = "Gauge";

        $scope.mySocialObject.options = {
            width: 500,
            height: 150,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 10
        };
        $scope.sendPost = function() {
            //var data = JSON.stringify({
            //   text: $scope.conversation
           //});
           $http.post(url,
                $scope.conversation)
                .success(function(data, status) {
                    $scope.myEmotionObject.data = [['Label', 'Value']];
                    $scope.myWritingObject.data = [['Label', 'Value']];
                    $scope.mySocialObject.data = [['Label', 'Value']];

                    $scope.response = data;
                    console.log(data[0].tones);
                    data[0].tones.forEach(function (element, index) {
                        $scope.myEmotionObject.data.push([element.tone_name, Math.round(element.score * 100)]);
                    });
                    data[1].tones.forEach(function(element, index){
                        $scope.myWritingObject.data.push([element.tone_name, Math.round(element.score * 100)]);
                    });
                    data[2].tones.forEach(function(element, index){
                        $scope.mySocialObject.data.push([element.tone_name, Math.round(element.score * 100)]);
                    });
            })
        };

    });
