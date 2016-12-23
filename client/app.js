'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',[])

.controller( 'TWSSController', function TWSSController ( $rootScope, $scope, $http) {
	
	$scope.submitForm = function(query){
		$scope.twss;
		$http.get('/twss', {params: {q:encodeURIComponent(query)}}).then(function(response){
			console.log(response.data);
			$scope.twss = response.data.twss;
			if($scope.twss){
				$scope.response = "That's what she sayd!!!";
			}else {
				$scope.response = "Sorry, can't say she sayd that...";
			}
		}, function(){
			$scope.response = "Sorry, can't say";
		});
	}
});
