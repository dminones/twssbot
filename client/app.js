'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',[])

.controller( 'TWSSController', function TWSSController ( $rootScope, $scope, $http) {
	
	$scope.submitForm = function(query){
		$scope.twss;
		$http.get('/twss', {params: {q:encodeURIComponent(query)}}).then(function(response){
			console.log(response.data);
			$scope.response = null;
			$scope.twss = response.data.twss;
			if($scope.twss){
				$scope.response = "That's what she said!!!";
			}else {
				$scope.response = "Sorry, can't say she said that...";
			}
		}, function(){
			$scope.response = "Sorry, can't say";
		});
	}
});
