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
    .controller('homeCtrl', function(getServ){
    	$("#buttonID").click(function (event){
    		getServ.getMovies();
    	})
    })
    .service('getServ', function(){
    	this.getMovies = function(){
    		var url = 'http://theimdbapi.org/api/find/person?name=' + $('#inputID').val();
    		$.get(url).then(function (data){
    			var dataActor = data[0].filmography.actor
    			var titels = [];
    			for (var j = 0; j < dataActor.length; j++){
    				titels.push(dataActor[j].title);
    			}
    			console.log(titels);
    		})
    	}
    	/*
    	var q = $q.defer();
    	var id = "ea5ff900d53cd148d636010dbe00088e";
    	this.getItem = function() {
    		$.get(url+id).then(function (data){
    			var item = JSON.parse(data);
    			item.naam = $("#inputID").val();
    			$http.put(url+item._id, JSON.stringify(item)).then(function (data){
    				q.resolve(JSON.parse(data.config.data));
    			}, function error (err){ q.reject(err);})
    		})
    		return q.promise;
    	}
    });
    */
    });