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
    .controller('homeCtrl', function($scope, getServ, saveServ, checkServ){
    	$("#buttonID").click(function (event){
    		checkServ.checkActor().then(function (data){
    			var jsonobj = JSON.parse(data);
    			if (jsonobj._id == $('#inputID').val()){
    				$scope.titel = jsonobj.movies + "";
    				console.log("Checked en in Database. Data opgehaald out CouchDB");
    			}
    			else {
    	    		getServ.getMovies().then(function (data){
    	    			var dataString = data + "";
    	    			$scope.titel = dataString;
    	    			saveServ.saveActor(data);
    	    			console.log("Checked not in database and saved");
    			})
    		}
    	})
    })
    })
    .service('getServ', function($q){
    	var q = $q.defer();
    	this.getMovies = function(){
    		var url = 'http://theimdbapi.org/api/find/person?name=' + $('#inputID').val();
    		$.get(url).then(function (data){
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
    .service("checkServ", function($q){
    	var q = $q.defer();
    	this.checkActor = function(){
    		$.get('../../'+$("#inputID").val()).then(function (data){
    			q.resolve(data);
  		}, function error (err){ q.reject(err);});
    		return q.promise;
    	}
    });