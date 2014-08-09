var module = angular.module('JGivenApp',['ngSanitize']);

var elasticSearchHost = 'localhost'

module.controller(
    'ApplicationController',
    ['$scope', '$http',
     function( $scope, $http ) {
         $scope.getScenarios = function() {
             console.log("Searching for "+$scope.search);
             data = {
                     query: {
                         multi_match: {
                             query: $scope.search,
                             type: 'most_fields',
                             fields: ['description', '_all']
                         }
                     },
                 size: 20,
                 highlight : {
                     fields : {
                         "description" : {}
                     }
                 }
             };
             $http({
                 method: 'POST',
                 url: 'http://' + elasticSearchHost + ':9200/r14.9/scenario/_search?pretty=true',
                 data: data
             }).success( function(data) {
                 console.log( JSON.stringify( data.hits.hits ) );
                 $scope.searchResult = data;
                 $scope.scenarios = data.hits.hits;
             });
         };

         $scope.trustHtml = function( html ) {
             return $sce.trustAsHtml( html );
         };
     }
]);
