'use strict'

angular.module('MovieApp', ['ngRoute'])

.config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'assets/views/home.html',
                controller: 'homeCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    })
    .controller('homeCtrl', function($scope, getServ, saveServ){
    	$("#buttonID").click(function (event){
    		getServ.getMovies().then(function (data){
    			var dataString = data + "";
    			$scope.titel = dataString;
    			saveServ.saveActor(data);
    		})
    	})
    })
    .service('getServ', function($q){
    	var q = $q.defer();
    	this.getMovies = function(){
    		var url = 'http://theimdbapi.org/api/find/person?name=' + $('#inputID').val();
    		$.get(url).then(function (data){
    			var actorID = data[0].person_id;
    			var dataActor = data[0].filmography.actor
    			var titels = [];
    			for (var j = 0; j < dataActor.length; j++){
    				titels.push(dataActor[j].title);
    			}
    			q.resolve(titels);	
    		}, function error (err){ q.reject(err); });
    		return q.promise;
    	}
    })
    .service("saveServ", function($http){
    	this.saveActor = function(titels){
    		var object = {"actor" : $("#inputID").val(), "movies": titels };
    		$http.put('../../'+$("#inputID").val(), object);
    	}
    })