'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource','baseURL', function($resource,baseURL){
           
                 this.getDishes = function(){
                    return $resource(baseURL+"dishes/:id",null,
                      {'update':{method:'PUT'}});
                };
                this.getPromo = function(){
                    return $resource(baseURL+"promotions/:id", null);
                };
        }])
        .service('feedbackService', ['$resource', 'baseURL', function($resource, baseURL){
            this.getFeedbacks = function(){
                return $resource(baseURL+"feedback/:id", null);
            };
        }])
        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var corpfac = {};
            
            corpfac.getLeaderships = function(){
              return $resource(baseURL+"leadership/:id", null);
            };
            return corpfac;
        }]);
