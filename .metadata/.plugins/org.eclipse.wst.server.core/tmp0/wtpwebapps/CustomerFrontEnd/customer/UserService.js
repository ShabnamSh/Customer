'use strict';
 
app.factory('UserService', ['$http', '$q','$rootScope', function($http, $q,$rootScope){
	
	console.log("UserService...")
	
	var BASE_URL='http://localhost:8084/CustomerBackEnd/'
		
    return {
         
            fetchAllUsers: function() {
            	console.log("calling fetchAllUsers ")
                    return $http.get(BASE_URL+'/getAll')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                   null
                            );
            },
          
           
            myProfile: function() {
            	console.log("calling fetchAllUsers ")
                    return $http.get(BASE_URL+'/myProfile')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                   null
                            );
            },
            
          
           
             
            createUser: function(customer){
            	console.log("calling create userrr")
                    return $http.post(BASE_URL+'/createUser/', customer) //1
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        //console.error('Error while creating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateUser: function(customer,emailId){
            	console.log("calling UpdateUsers ")
                    return $http.put(BASE_URL+'/updateUser',customer)  //2
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
              
            logout: function(){
            	console.log('logout....')
                return $http.get(BASE_URL+'/logout')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                              null
                        );
        },
        
      
        
            
            authenticate: function(customer){
            	   console.log("Calling the method authenticate with the user :"+customer);
          		 
                return $http.post(BASE_URL+'/login',customer)
                        .then(
                                function(response){
                                    return response.data;   //user json object
                                }, 
                               null
                        );
        }
         
    };
 
}]);