angular.module("myApp",["myApp.service"])
	.controller('ServiceController',function($scope,$timeout,githubService){
	
	var timout ;
	$scope.$watch('username',function(newUserName){
		if(newUserName){
			if(timout){
				$timeout.cancel(timout);
			}
			timout =$timeout(function(){
				githubService.events(newUserName)
					.success(function(data,stats){
					$scope.events = data.data;
				})
			},350);
		}
	})
	
	
	
	
//	$scope.events=[{
//		"actor":{"login":"aadd"},
//		"repo":{"name":"23232"}
//	}];
});


angular.module('myApp.service',[])
	.factory('githubService',function($http){
	var githubUrl = "https://api.github.com";
	
	var runUserRequest = function(username,path){
		return $http({
			method:'JSONP',
			url:githubUrl+'/users/'+username+"/"+path+'?callback=JSON_CALLBACK'
		})
	}
	
	return {
		events: function(username){
			return runUserRequest(username,"events");
		}
	}
	
});
