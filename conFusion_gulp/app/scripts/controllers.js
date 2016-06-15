'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = true;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
//have to wait
            menuFactory.getDishes().query(
                function(response){
                    $scope.dishes = response;
                    $scope.showMenu = true;
                 },
                 function(response){
                    $scope.message = "Error: " + response.status + " "+ response.statusText;
                 }
            );
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope','feedbackService', function($scope, feedbackService) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    var Feedbacks = feedbackService.getFeedbacks();
                    Feedbacks.save($scope.feedback).$promise.then( 
                        function(response){
                            console.log("success");
                        },
                        function(response){
                            $scope.message = "Error: " + response.status + " "+ response.statusText;
                        }
                    );
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.dish={};
            $scope.showDish = false;
            $scope.message = "Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                function(response){
                    $scope.dishes = response;
                    $scope.showMenu = true;
                 },
                 function(response){
                    $scope.message = "Error: " + response.status + " "+ response.statusText;
                 }
            );
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController',['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory){
            $scope.showLeadership = false;
            $scope.showPromo=false;
            $scope.message = "Loading ...";
            $scope.showDish = false;
            $scope.dish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                 },
                 function(response){
                    $scope.message = "Error: " + response.status + " "+ response.statusText;
                 }
            );
            $scope.promo = menuFactory.getPromo().get({id:0})
            .$promise.then(
                function(response){
                    $scope.promo = response;
                    $scope.showPromo = true;
                },
                function(response){
                  $scope.message = "Error: " + response.status + " "+ response.statusText;
                }
            );
            $scope.leadership = corporateFactory.getLeaderships().get({id:3})
            .$promise.then(
                function(response){
                    $scope.leadership = response;
                    $scope.showLeadership=true;
                },
                function(response){  
                    $scope.message = "Error: " + response.status + " "+ response.statusText;
                }
            );
            
        }])
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
           $scope.showLeadership=false;
           $scope.Message="Loading ...";
           corporateFactory.getLeaderships().query(
                function(response){
                    $scope.leaderships = response;
                    $scope.showLeadership = true;
                 },
                 function(response){
                    $scope.message = "Error: " + response.status + " "+ response.statusText;
                 }
            );
        }]);
