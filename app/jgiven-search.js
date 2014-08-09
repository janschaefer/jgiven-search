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
                             type: 'cross_fields',
                             operator: 'and',
                             fields: ['description', 'scenarioCases.steps.words.value', '_all']
                         }
                     },
                 size: 20,
                 highlight : {
                     fields : {
                         "description" : {},
                         "scenarioCases.steps.words.value" : {}
                     }
                 }
             };
             $http({
                 method: 'POST',
                 url: 'http://' + elasticSearchHost + ':9200/r14.9/scenario/_search?pretty=true',
                 data: data
             }).success( function(data) {
                 // console.log( JSON.stringify( data.hits.hits ) );
                 $scope.searchResult = data;
                 $scope.scenarios = data.hits.hits;
             });
         };

         $scope.trustHtml = function( html ) {
             return $sce.trustAsHtml( html );
         };

         $scope.getHighlightedValue = function( highlightedValues, normalValue ) {
             if ( undefined === highlightedValues ) {
                 return normalValue;
             }

             var result = normalValue
             highlightedValues.some( function( value, index, array ) {
                 var strippedValue = value.replace(/(<([^>]+)>)/ig,"")
                 if ( strippedValue === normalValue ) {
                     console.log( value );
                     result = value;
                     return true;
                 };
             });

             return result;
         };
     }
]);
