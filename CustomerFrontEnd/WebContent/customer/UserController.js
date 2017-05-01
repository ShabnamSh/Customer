'use strict';

app
		.controller(
				'UserController',
				[
						'$scope',
						'UserService',
						'$location',
						'$rootScope',
						'$cookieStore',
						'$http',
						'$q',
						'$route',
						function($scope, UserService, $location, $rootScope,
								$cookieStore, $q, $http,$route) {
							console.log("UserController...")
							var self = this;
							this.customer = {
								emailId: '',
								name : '',
								cardId : '',
								address : '',
								dob : '',
								gender : '',
								points : '',
								creditLimit : '',
								errorCode : '',
								errorMessage : ''
							};

							this.customers = []; // json array
							this.customerlist = []; // json array
							$scope.orderByMe = function(x) {
								$scope.myOrderBy = x;
							}

							self.fetchAllUsers = function() {
								console.log("fetchAllUsers...")
								UserService
										.fetchAllUsers()
										.then(
												function(data) {
													self.customers = data;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};

							// self.fatchAllUsers();

							self.searchAllUsers = function() {
								console.log("search AllUsers...")
								UserService
										.fetchAllUsers()
										.then(
												function(d) {
													self.customerlist = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};

							self.createUser = function(customer) {
								console.log("createUser...")
								UserService
										.createUser(user)
										.then(
												function(data) {
													alert("Thank you for registration")
													$location.path("/login")
												},
												function(errResponse) {
													console
															.error('Error while creating User.');

												});
							};

							self.myProfile = function() {
								console.log("myProfile...")
								UserService
										.myProfile()
										.then(
												function(d) {
													self.customer = d;
													$location
															.path("/myProfile")
												},
												function(errResponse) {
													console
															.error('Error while fetch profile.');
												});
							};

						

							

							self.updateUser = function(currentUser) {
								console.log("updateUser...")
								UserService
										.updateUser(currentUser)
										.then(
												function(d) {
													self.customer = d;
													$location
													.path("/")
											alert("User updated successfully");
												},
												function(errResponse) {
													console
															.error('Error while update user.');
												});
							};

							
							self.update = function() {
								{
									console.log('Update the user details',$rootScope.currentUser);
									self.updateUser($rootScope.currentUser);
								}
								self.reset();
							};


							self.authenticate = function(customer) {
								console.log("authenticate...");
								UserService
										.authenticate(customer)
										.then(

												function(d) {

													self.customer = d;
													console
															.log("user.errorCode: "
																	+ self.customer.errorCode)
													if (self.customer.errorCode == "404")

													{
														alert(self.customer.errorMessage)

														self.customer.emailId = "";
														self.customer.dob = "";

													} else { // valid
																// credentials
														console
																.log("Valid credentials. Navigating to home page");

														/* self.fetchAllUsers(); */

														console
																.log('Current user : '
																		+ self.user);
														$rootScope.currentUser = self.user;
														

														/*$http.defaults.headers.common['Authorization'] = 'Basic '
																+ $rootScope.currentUser;*/
														$cookieStore.put(
																'currentUser',
																self.user);
														$location.path('/myProfile');
														
														
													}
												},

												function(errResponse) {

													console
															.error('Error while authenticate Users');
												});
							};

							self.logout = function() {
								console.log("logout")
								alert("logout successfully")
								$rootScope.currentUser = {};
								$cookieStore.remove('currentUser');
								UserService.logout();
								$location.path('/');

							}

							// self.fetchAllUsers(); //calling the method

							// better to call fetchAllUsers -> after login ???

							self.login = function() {
								{
									console.log('login validation????????'+self.customer);
									self.authenticate(self.customer);
								}

							};

							self.submit = function() {
								{
									console.log('Saving New User', self.customer);
									self.createUser(self.customer);
								}
								self.reset();
							};

							self.reset = function() {
								self.customer = {
										emailId: '',
										name : '',
										cardId : '',
										address : '',
										dob : '',
										gender : '',
										points : '',
										creditLimit : '',
										errorCode : '',
										errorMessage : ''
								};
								$scope.myForm.$setPristine(); // reset Form
							};
							

							   

						} ]);